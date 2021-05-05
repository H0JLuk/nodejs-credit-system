const isValidUsername = (name) => name.length >= 3

const isValidPassword = (password) =>
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(password)

module.exports = { isValidUsername, isValidPassword }
