const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { sentMail } = require('../config/nodemailer')

const readFile = promisify(fs.readFile)

const sendEmailConfirmation = async ({ email, confirmationCode }) => {
  let html = await readFile(path.resolve(__dirname, '..', 'views', 'emailSubmit.html'), 'utf8')
  const url = process.env.SERVER_API + `auth/submit-email?email=${email}&confirmation_code=${confirmationCode}`
  html = html.replace(/\${emailSubmitURL}/gi, url)

  const mailInfo = await sentMail({ subject: 'Email confirmation', to: email, html })
  return mailInfo
}

const sendResetPasswordRequest = async ({ email, confirmationCode }) => {
  let html = await readFile(path.resolve(__dirname, '..', 'views', 'passwordReset.html'), 'utf8')
  const url = process.env.CLIENT_API + `custom-url?email=${email}&confirmation_code=${confirmationCode}`
  html = html.replace(/\${resetPasswordURL}/gi, url)

  const mailInfo = await sentMail({ subject: 'Reset password', to: email, html })
  return mailInfo
}

module.exports = { sendEmailConfirmation, sendResetPasswordRequest }
