const express = require('express')
const router = express.Router()

const { login, registration } = require('../controllers/authController')

router.post('/login', login)
router.post('/register', registration)

module.exports = router
