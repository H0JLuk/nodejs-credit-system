const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPassword = (password) => {
  const saltRounds = 10

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (!err) {
        resolve(hash)
      } else {
        reject(err)
      }
    })
  })
}

const comparePasswords = (plainPassword, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashPassword, function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
const signAccessToken = (data = {}, expiresIn = '1y') => jwt.sign(data, process.env.JWT_SECRET, { expiresIn })

module.exports = {
  hashPassword,
  comparePasswords,
  signAccessToken,
}
