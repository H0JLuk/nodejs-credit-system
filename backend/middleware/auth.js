const jwt = require('jsonwebtoken')
const { isValidUsername, isValidPassword } = require('../helpers/validators')

function verifyToken(req, res, next) {
  const header = req.headers['authorization']
  const token = header && header.split(' ')[1]

  if (token === null) {
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
  const { username, password } = req.body

  const isValid = isValidUsername(username) && isValidPassword(password)

  isValid ? next() : res.status(400).end()
}

function verifyRegisterRoute(req, res, next) {
  const { username, password, firstName, middleName, lastName } = req.body
  const names = [firstName, middleName, lastName] // TODO: implement image checking

  const isValid = isValidUsername(username) && isValidPassword(password) && names.every((name) => name.length >= 3)

  isValid ? next() : res.status(400).end()
}

module.exports = { verifyToken, verifyLoginRoute, verifyRegisterRoute }
