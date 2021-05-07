const { Schema, model } = require('mongoose')

const requiredTrimStringType = {
  type: Schema.Types.String,
  trim: true,
  required: true,
}

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      category: requiredTrimStringType,
      mark: requiredTrimStringType,
      model: requiredTrimStringType,
      cost: requiredTrimStringType,
    },
  ],
  insurance: requiredTrimStringType,
  delivery: requiredTrimStringType,

  // second page
  passportImgScan: requiredTrimStringType,
  passportFirstName: requiredTrimStringType,
  passportMiddleName: requiredTrimStringType,
  passportLastName: requiredTrimStringType,

  passportDateOfBirth: Schema.Types.Date,
  /// ...
  educationType: {},

  // contacts page
  workPhone: Schema.Types.Number,
  homePhone: Schema.Types.Number,
  email: customStringType,
  contactFaces: [
    {
      names: customStringType,
      phone: Schema.Types.Number,
    },
  ],
  // ...
  // family
  maritalStatus: requiredTrimStringType,
  amountOfChildren: requiredTrimStringType,
})

module.exports = model('Credit', schema)
