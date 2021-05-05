const mongoose = require('mongoose')

console.log('Start connection to bd...')

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log('Connection has been established successfully.')
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}

start()
