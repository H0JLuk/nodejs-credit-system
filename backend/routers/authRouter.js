const express = require('express')
const router = express.Router()

const { verifyLoginRoute, verifyRegisterRoute } = require('../middleware/auth')
const { login, registration } = require('../controllers/authController')

router.post('/login', verifyLoginRoute, login)
router.post('/register', verifyRegisterRoute, registration)

module.exports = router
