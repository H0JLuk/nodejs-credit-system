const { Schema, model } = require('mongoose')

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
})

module.exports = model('User', schema)
