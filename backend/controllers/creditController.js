const creditService = require('../services/creditService.js')

const creditController = {}

creditController.parameters = async (req, res) => {
  const {} = req.body

  try {
    const response = await creditService.parameters()
    res.json(response)
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

creditController.clientData = async (req, res) => {
  const {} = req.body

  try {
    const response = await creditService.parameters()
    res.json(response)
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

creditController.workAndFinance = async (req, res) => {
  const {} = req.body

  try {
    const response = await creditService.parameters()
    res.json(response)
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

creditController.contactsData = async (req, res) => {
  const {} = req.body

  try {
    const response = await creditService.parameters()
    res.json(response)
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

creditController.additionally = async (req, res) => {
  const {} = req.body

  try {
    const response = await creditService.parameters()
    res.json(response)
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }
}

module.exports = creditController
