const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const User = require('../models/User')

describe('/auth', () => {
  let accessToken
  let url
  let requestBody, requestQuery

  afterAll(async () => {
    try {
      await mongoose.connection.close()
    } catch (err) {
      console.error(err)
    }
  })

  describe('/register', () => {
    beforeAll(async () => {
      url = '/auth/register'
      await User.findOneAndDelete({ email: process.env.TEST_MAIL_LOGIN })
    })

    beforeEach(() => {
      requestBody = {
        email: process.env.TEST_MAIL_LOGIN,
        password: process.env.TEST_MAIL_PASSWORD,
        firstName: 'Test name',
        middleName: 'Test middleName',
        lastName: 'Test lastName',
      }
    })

    test('invalid request body', async () => {
      requestBody.firstName = ''
      const response = await request(app).post(url)

      expect(response.statusCode).toEqual(400)
      expect(response.body).toEqual({})
    })

    test('correct request', async () => {
      const response = await request(app).post(url).send(requestBody)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(
        expect.objectContaining({
          email: requestBody.email,
          firstName: requestBody.firstName,
          middleName: requestBody.middleName,
          lastName: requestBody.lastName,
        })
      )
    })

    test('User already exists', async () => {
      const response = await request(app).post(url).send(requestBody)
      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'User already exists',
        })
      )
    })
  })

  describe('/login', () => {
    beforeAll(async () => {
      url = '/auth/login'
    })

    beforeEach(() => {
      requestBody = { email: process.env.TEST_MAIL_LOGIN, password: process.env.TEST_MAIL_PASSWORD }
    })

    test('invalid request body', async () => {
      requestBody.email = 'asd@as.d'
      const response = await request(app).post(url).send(requestBody)
      expect(response.statusCode).toBe(400)
    })

    test('invalid password', async () => {
      requestBody.password = '12345Aa!!'
      const response = await request(app).post(url).send(requestBody)

      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'Invalid email or password',
        })
      )
    })

    test('correct request', async () => {
      const response = await request(app).post(url).send(requestBody)

      const responseBody = {
        user: {
          email: requestBody.email,
          firstName: expect.any(String),
          middleName: expect.any(String),
          lastName: expect.any(String),
          img: null,
        },
        accessToken: expect.any(String),
      }

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(responseBody)
      accessToken = response.body.accessToken
    })
  })

  describe('/submit-email', () => {
    let confirmation_code

    beforeAll(async () => {
      url = '/auth/submit-email'
      const response = await User.findOne({ email: process.env.TEST_MAIL_LOGIN })
      confirmation_code = response.mailConfirmationRequest
    })

    beforeEach(() => {
      requestQuery = { email: process.env.TEST_MAIL_LOGIN, confirmation_code }
    })

    test('invalid request body', async () => {
      requestQuery.email = 'ss@ss.s'
      const response = await request(app).get(url).query(requestQuery)

      expect(response.statusCode).toBe(400)
    })

    test('invalid email', async () => {
      requestQuery.email = 'test@test.test'
      const response = await request(app).get(url).query(requestQuery)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ message: 'Invalid email' })
    })

    test('invalid confirmation code', async () => {
      requestQuery.confirmation_code = '12345678'
      const response = await request(app).get(url).query(requestQuery)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ message: 'Invalid code' })
    })

    test('correct request', async () => {
      const response = await request(app).get(url).query(requestQuery)
      expect(response.statusCode).toBe(302)
    })

    test('Email already confirmed', async () => {
      const response = await request(app).get(url).query(requestQuery)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ message: 'Email already confirmed' })
    })
  })

  describe('/reset-password/request', () => {
    beforeAll(() => {
      url = '/auth/reset-password/request'
    })

    beforeEach(() => {
      requestBody = { email: process.env.TEST_MAIL_LOGIN }
    })

    test('invalid email', async () => {
      requestBody.email = 'test@test.test'
      const response = await request(app).post(url).send(requestBody)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ message: 'Email is not valid' })
    })

    test('correct request', async () => {
      const response = await request(app).post(url).send(requestBody)

      expect(response.statusCode).toBe(201)
    })
  })

  describe('/reset-password/confirm', () => {
    let confirmationCode

    beforeAll(async () => {
      url = '/auth/reset-password/confirm'
      confirmationCode = (await User.findOne({ email: process.env.TEST_MAIL_LOGIN })).resetPasswordRequest
    })

    beforeEach(() => {
      requestBody = {
        email: process.env.TEST_MAIL_LOGIN,
        confirmationCode,
        password: '12345Aa!!',
      }
    })

    test('invalid request body', async () => {
      requestBody.email = 's@s.s'
      requestBody.password = '543'
      const response = await request(app).post(url).send(requestBody)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({})
    })

    test('invalid confirmation code', async () => {
      requestBody.confirmationCode = '123123123'
      const response = await request(app).post(url).send(requestBody)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({ message: 'Invalid confirmation code' })
    })

    test('correct request', async () => {
      const response = await request(app).post(url).send(requestBody)
      const user = await User.findOne({ email: process.env.TEST_MAIL_LOGIN })

      expect(response.statusCode).toBe(200)
    })
  })
})
