const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
  service: 'Mail.ru',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
})

const sentMail = async ({ subject, to, html }) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    subject,
    html,
    text: '',
  }

  try {
    const mailInfo = await smtpTransport.sendMail(mailOptions)
    return mailInfo
  } catch (err) {
    throw { err, code: 500 }
  }
}

module.exports = { sentMail }
