const authService = require('../services/authService')

const authController = {}

authController.login = async (req, res) => {
  const { username, password } = req.body

  try {
    const response = await authService.login({ username, password })
    res.json(response)
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

authController.registration = async (req, res) => {
  const { username, password, firstName, middleName, lastName, img } = req.body

  try {
    const response = await authService.registration({ username, password, firstName, middleName, lastName, img })
    res.status(200).json(response)
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

module.exports = authController
