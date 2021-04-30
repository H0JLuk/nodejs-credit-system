const authController = {}

authController.login = async (req, res) => {
  const { username, password } = req.body

  res.json({ username, password })
}

authController.registration = async (req, res) => {
  const { username, password, first_name, middle_name, last_name, img } = req.body

  res.status(201).json({ username, password, first_name, middle_name, last_name, img })
}

module.exports = authController
