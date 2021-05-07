const authService = require('../services/authService')

const authController = {}

authController.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const response = await authService.login({ email, password })
    res.json(response)
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

authController.registration = async (req, res) => {
  const { email, password, firstName, middleName, lastName } = req.body

  try {
    const response = await authService.registration({ email, password, firstName, middleName, lastName })
    res.json(response)
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

authController.submitEmail = async (req, res) => {
  const { email, confirmation_code: confirmationCode } = req.query

  try {
    await authService.submitEmail({ email, confirmationCode })
    res.redirect('https://goo.gle')
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

authController.resetPasswordRequest = async (req, res) => {
  const { email } = req.body

  try {
    await authService.resetPasswordRequest({ email })
    res.status(201).end()
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

authController.resetPasswordConfirm = async (req, res) => {
  const { email, confirmationCode, password } = req.body

  try {
    await authService.resetPasswordConfirm({ email, confirmationCode, password })
    res.end()
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

module.exports = authController
