const { isValidEmail, isValidPassword, isValidPhone, isValidUsername } = require('../validators')

describe('helpers validators', () => {
  describe('check isValidEmail function', () => {
    let email

    test('incorrect email', () => {
      email = '@ss.ss'
      const result = isValidEmail(email)

      expect(result).toBeFalsy()
    })

    test('incorrect email', () => {
      email = 'ss@.ss'
      const result = isValidEmail(email)

      expect(result).toBeFalsy()
    })

    test('incorrect email', () => {
      email = 'ss@ss.s'
      const result = isValidEmail(email)

      expect(result).toBeFalsy()
    })

    test('should return true', () => {
      email = 's@s.ss'
      const result = isValidEmail(email)

      expect(result).toBeTruthy()
    })
  })

  describe('check isValidPassword function', () => {
    let password

    test('invalid password', () => {
      password = '12345Aaa'
      const result = isValidPassword(password)

      expect(result).toBeFalsy()
    })

    test('no lower case char', () => {
      password = '12345AA!'
      const result = isValidPassword(password)

      expect(result).toBeFalsy()
    })

    test('no upper case char', () => {
      password = '12345aa!'
      const result = isValidPassword(password)

      expect(result).toBeFalsy()
    })

    test('no special char', () => {
      password = '12345Aaa'
      const result = isValidPassword(password)

      expect(result).toBeFalsy()
    })

    test('no digits', () => {
      password = 'AAAAAAaa'
      const result = isValidPassword(password)

      expect(result).toBeFalsy()
    })

    test('less than 8 chars', () => {
      password = '1234Aa!'
      const result = isValidPassword(password)

      expect(result).toBeFalsy()
    })

    test('should return true', () => {
      password = '12345Aa!'
      const result = isValidPassword(password)

      expect(result).toBeTruthy()
    })
  })

  describe('test isValidUsername function', () => {
    let username

    test('less than 3 chars', () => {
      username = 'Sq'
      const result = isValidUsername(username)

      expect(result).toBeFalsy()
    })

    test('invalid username', () => {
      username = '1wasd'
      const result = isValidUsername(username)

      expect(result).toBeFalsy()
    })

    test('correct name', () => {
      username = 'Sql'
      const result = isValidUsername(username)

      expect(result).toBeTruthy()
    })
  })

  describe('test isValidPhone function', () => {
    let phone

    test('less than 11 char', () => {
      phone = '8959555555'
      const result = isValidPhone(phone)

      expect(result).toBeFalsy()
    })

    test('more than 11 char', () => {
      phone = '895955555562'
      const result = isValidPhone(phone)

      expect(result).toBeFalsy()
    })

    test('has char', () => {
      phone = '79402346d54'
      const result = isValidPhone(phone)

      expect(result).toBeFalsy()
    })

    test('correct phone', () => {
      phone = '79402346534'
      const result = isValidPhone(phone)

      expect(result).toBeTruthy()
    })
  })
})
