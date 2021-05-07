const { Schema, model } = require('mongoose')

const trimStringType = {
  type: Schema.Types.String,
  trim: true,
  required: false,
}

const requiredTrimStringType = {
  ...trimStringType,
  required: true,
}

const schema = new Schema({
  email: requiredTrimStringType,
  password: requiredTrimStringType,
  isSubmittedEmail: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
  firstName: requiredTrimStringType,
  middleName: requiredTrimStringType,
  lastName: requiredTrimStringType,
  img: { ...trimStringType, default: null },
  mailConfirmationRequest: trimStringType,
  resetPasswordRequest: { ...trimStringType, default: null },
})

module.exports = model('User', schema)
