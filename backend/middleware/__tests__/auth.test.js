require('../../config')
const { verifyLoginRoute, verifyRegisterRoute, verifySubmitEmail, verifyResetPasswordConfirm } = require('../auth')

describe('auth middleware', () => {
  let mockRequest = {}
  let mockResponse = {}
  let nextFunction

  beforeEach(() => {
    mockRequest = { body: {}, query: {} }
    nextFunction = jest.fn()

    mockResponse = {
      statusCode: null,
      status(code) {
        this.statusCode = code
        return this
      },
      end() {},
    }
  })

  describe('test verifyLoginRoute function', () => {
    beforeEach(() => {
      mockRequest.body = { email: process.env.TEST_MAIL_LOGIN, password: process.env.TEST_MAIL_PASSWORD }
    })

    test('invalid email', () => {
      mockRequest.body.email = 's@s.s'
      verifyLoginRoute(mockRequest, mockResponse, nextFunction)

      expect(mockResponse.statusCode).toEqual(400)
    })

    test('invalid password', () => {
      mockRequest.body.password = '12345Aaa'
      verifyLoginRoute(mockRequest, mockResponse, nextFunction)

      expect(mockResponse.statusCode).toEqual(400)
    })

    test('correct request', () => {
      verifyLoginRoute(mockRequest, mockResponse, nextFunction)

      expect(nextFunction).toBeCalledTimes(1)
    })
  })

  describe('test verifyRegisterRoute function', () => {
    beforeEach(() => {
      mockRequest.body = {
        email: process.env.TEST_MAIL_LOGIN,
        password: process.env.TEST_MAIL_PASSWORD,
        firstName: 'Test name',
        middleName: 'Test name',
        lastName: 'Test name',
      }
    })

    test('invalid email', () => {
      mockRequest.body.email = 's@s.s'
      verifyRegisterRoute(mockRequest, mockResponse, nextFunction)

      expect(mockResponse.statusCode).toBe(400)
    })

    test('invalid password', () => {
      mockRequest.body.email = '12345Aa'
      verifyRegisterRoute(mockRequest, mockResponse, nextFunction)

      expect(mockResponse.statusCode).toBe(400)
    })

    test('correct request', () => {
      verifyRegisterRoute(mockRequest, mockResponse, nextFunction)

      expect(nextFunction).toBeCalledTimes(1)
    })
  })

  describe('test verifySubmitEmail function', () => {
    beforeEach(() => {
      mockRequest.query = { email: process.env.TEST_MAIL_LOGIN, confirmation_code: '123' }
    })

    test('invalid email', () => {
      mockRequest.query.email = 's2@2f.2'
      verifySubmitEmail(mockRequest, mockResponse, nextFunction)

      expect(mockResponse.statusCode).toBe(400)
    })

    test('invalid confirmation_code', () => {
      mockRequest.query.confirmation_code = ''
      verifySubmitEmail(mockRequest, mockResponse, nextFunction)

      expect(mockResponse.statusCode).toBe(400)
    })

    test('correct request', () => {
      verifySubmitEmail(mockRequest, mockResponse, nextFunction)

      expect(nextFunction).toBeCalledTimes(1)
    })
  })

  describe('test verifyResetPasswordConfirm function', () => {
    beforeEach(() => {
      mockRequest.body = {
        email: process.env.TEST_MAIL_LOGIN,
        confirmationCode: '123',
        password: process.env.TEST_MAIL_PASSWORD,
      }
    })

    test('invalid email', () => {
      mockRequest.body.email = 's@s.2'
      verifyResetPasswordConfirm(mockRequest, mockResponse, nextFunction)

      expect(mockResponse.statusCode).toBe(400)
    })

    test('invalid confirmationCode', () => {
      mockRequest.body.confirmationCode = ''
      verifyResetPasswordConfirm(mockRequest, mockResponse, nextFunction)

      expect(mockResponse.statusCode).toBe(400)
    })

    test('invalid password', () => {
      mockRequest.body.password = '12345Aa'
      verifyResetPasswordConfirm(mockRequest, mockResponse, nextFunction)

      expect(mockResponse.statusCode).toBe(400)
    })

    test('correct request', () => {
      verifyResetPasswordConfirm(mockRequest, mockResponse, nextFunction)

      expect(nextFunction).toBeCalledTimes(1)
    })
  })
})
