const { isValidEmail, isValidPhone } = require('../helpers/validators')

const verifyContactsData = (req, res, next) => {
  const { workPhone, homePhone, email, contactFaces } = req.body

  const isValid =
    isValidPhone(workPhone) && isValidPhone(homePhone) && isValidEmail(email) && Array.isArray(contactFaces)

  isValid ? next() : res.status(400).end()
}

module.exports = { verifyContactsData }
