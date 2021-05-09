const { comparePasswords, hashPassword, signAccessToken, generateUnicCode } = require('../helpers')
const { sendEmailConfirmation, sendResetPasswordRequest } = require('../helpers/nodemailer')
const User = require('../models/User')

const authService = {}

authService.login = async ({ email, password }) => {
  const user = await User.findOne({ email })

  const isValidPassword = await comparePasswords(password, user?.password || '')

  if (!isValidPassword) {
    throw { code: 401, message: 'Invalid email or password' }
  }

  const accessToken = signAccessToken({ email: user.email })
  const { firstName, middleName, lastName, img } = user
  return { user: { email, firstName, middleName, lastName, img }, accessToken }
}

authService.registration = async ({ email, password, firstName, middleName, lastName }) => {
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw { code: 401, message: 'User already exists' }
  }

  const hashedPassword = await hashPassword(password)
  const confirmationCode = generateUnicCode()
  const createdUser = await User.create({
    email,
    password: hashedPassword,
    firstName,
    middleName,
    lastName,
    mailConfirmationRequest: confirmationCode,
  })

  sendEmailConfirmation({ email, confirmationCode })

  const { _id: id } = createdUser.toObject()
  return { id, email, firstName, middleName, lastName }
}

authService.submitEmail = async ({ email, confirmationCode }) => {
  const user = await User.findOne({ email })

  if (!user) throw { code: 400, message: 'Invalid email' }
  if (user.isSubmittedEmail) throw { code: 400, message: 'Email already confirmed' }

  const isValidCode = user.mailConfirmationRequest === confirmationCode

  if (!isValidCode) throw { code: 400, message: 'Invalid code' }

  user.mailConfirmationRequest = null
  user.isSubmittedEmail = true
  await user.save()
}

authService.resetPasswordRequest = async ({ email }) => {
  const confirmationCode = generateUnicCode()
  const user = await User.findOneAndUpdate({ email }, { resetPasswordRequest: confirmationCode })

  if (!user) throw { code: 400, message: 'Email is not valid' }

  sendResetPasswordRequest({ email, confirmationCode })
}

authService.resetPasswordConfirm = async ({ email, confirmationCode, password }) => {
  const data = await User.findOneAndUpdate(
    { email, resetPasswordRequest: confirmationCode },
    { password: await hashPassword(password), resetPasswordRequest: null }
  )

  if (!data) {
    throw { code: 400, message: 'Invalid confirmation code' }
  }
}

module.exports = authService
