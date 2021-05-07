const express = require('express')
const router = express.Router()

const {
  verifyLoginRoute,
  verifyRegisterRoute,
  verifySubmitEmail,
  verifyResetPasswordConfirm,
} = require('../middleware/auth')
const {
  login,
  registration,
  submitEmail,
  resetPasswordRequest,
  resetPasswordConfirm,
} = require('../controllers/authController')

router.post('/login', verifyLoginRoute, login)
router.post('/register', verifyRegisterRoute, registration)
router.get('/submit-email', verifySubmitEmail, submitEmail)

router.post('/reset-password/request', resetPasswordRequest)
router.post('/reset-password/confirm', verifyResetPasswordConfirm, resetPasswordConfirm)

module.exports = router
