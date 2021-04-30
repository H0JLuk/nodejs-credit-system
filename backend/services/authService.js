const { comparePasswords, hashPassword, signAccessToken } = require('../helpers')

const authService = {}

authService.login = async ({ username, password }) => {
  const user = {}
  // await User.findOne({ where: { username } })

  const isValidPassword = await comparePasswords(password, user?.password || '')

  if (!isValidPassword) {
    throw { code: 401, message: 'Invalid email or password' }
  }

  const accessToken = signAccessToken({ username: user.username })
  const { firstName, middleName, lastName, img } = user
  return { user: { username, firstName, middleName, lastName, img }, accessToken }
}

authService.registration = async ({ username, password, firstName, middleName, lastName, img }) => {
  const existingUser = null
  // await User.findOne({ where: { username } })
  if (existingUser) {
    throw { code: 401, message: 'User already exist' }
  }

  const hashedPassword = await hashPassword(password)

  const createdUser = { id: new Date.toString(), username, firstName, middleName, lastName, img }
  /*await User.create({ })*/
  return createdUser
}

module.exports = authService
