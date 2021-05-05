const { comparePasswords, hashPassword, signAccessToken } = require('../helpers')
const User = require('../models/user')

const authService = {}

authService.login = async ({ username, password }) => {
  const user = await User.findOne({ username })

  const isValidPassword = await comparePasswords(password, user?.password || '')

  if (!isValidPassword) {
    throw { code: 401, message: 'Invalid email or password' }
  }

  const accessToken = signAccessToken({ username: user.username })
  const { firstName, middleName, lastName, img } = user
  return { user: { username, firstName, middleName, lastName, img }, accessToken }
}

authService.registration = async ({ username, password, firstName, middleName, lastName, img }) => {
  const existingUser = await User.findOne({ username })

  if (existingUser) {
    throw { code: 401, message: 'User already exist' }
  }

  const hashedPassword = await hashPassword(password)
  const createdUser = await User.create({
    username,
    password: hashedPassword,
    firstName,
    middleName,
    lastName,
    img,
  })
  const { _id: id } = createdUser.toObject()

  return { id, username, firstName, middleName, lastName, img }
}

module.exports = authService
