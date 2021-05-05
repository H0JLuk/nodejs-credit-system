const express = require('express')
const router = express.Router()

const creditController = require('../controllers/creditController')
const { verifyToken } = require('../middleware/auth')
const { verifyContactsData } = require('../middleware/credit')

router.post('/parameters', verifyToken, creditController.parameters)
router.put('/client-data', verifyToken, creditController.clientData)
router.put('/work-and-finance', verifyToken, creditController.workAndFinance)
router.put('/contacts-data', verifyToken, verifyContactsData, creditController.contactsData)
router.put('/additionally', verifyToken, creditController.additionally)

module.exports = router
