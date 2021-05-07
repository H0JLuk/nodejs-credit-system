const jwt = require('jsonwebtoken')
const { isValidEmail, isValidPassword } = require('../helpers/validators')

function verifyToken(req, res, next) {
  const header = req.headers['authorization']
  const token = header?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access denied' })
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
    if (err) {
      return res.status(401).json({ message: 'Access denied' })
    }

    req.user = data
    next()
  })
}

function verifyLoginRoute(req, res, next) {
  const { email, password } = req.body

  const isValid = isValidEmail(email) && isValidPassword(password)

  isValid ? next() : res.status(400).end()
}

function verifyRegisterRoute(req, res, next) {
  const { email, password, firstName, middleName, lastName } = req.body
  const names = [firstName, middleName, lastName] // TODO: implement image checking

  const isValid = isValidEmail(email) && isValidPassword(password) && names.every((name) => name.length >= 3)

  isValid ? next() : res.status(400).end()
}

const verifySubmitEmail = (req, res, next) => {
  const { email, confirmation_code } = req.query

  const isValid = isValidEmail(email) && confirmation_code

  isValid ? next() : res.status(400).end()
}

const verifyResetPasswordConfirm = (req, res, next) => {
  const { email, confirmationCode, password } = req.body

  const isValid = isValidEmail(email) && confirmationCode && isValidPassword(password)

  isValid ? next() : res.status(400).end()
}

module.exports = { verifyToken, verifyLoginRoute, verifyRegisterRoute, verifySubmitEmail, verifyResetPasswordConfirm }
