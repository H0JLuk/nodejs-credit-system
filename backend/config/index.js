const path = require('path')

const isTestEnv = process.env.NODE_ENV === 'test'

const dotenvPath = path.resolve(__dirname, '..', isTestEnv ? '.env.test' : '.env')
require('dotenv').config({ path: dotenvPath })
require('./nodemailer')
