import supertest from 'supertest'
import web from '../../src/applications/web.js'
import { createTestUser, removeTestUser } from '../utils/user.util.js'

const uniqueEmail = 'test33@example.com'

describe('GET /register - endpoint', () => {
  it('should be able to show register page', async () => {
    const result = await supertest(web).get('/register')

    expect(result.status).toBe(200)
    expect(result.text).toContain('Register')
    expect(result.text).toContain('Please register')
  })
})

describe('POST /register - endpoint', () => {
  afterEach(async () => {
    await removeTestUser(uniqueEmail)
  })

  it('should be able to register a new user with correct identities', async () => {
    const result = await supertest(web).post('/register').send({
      name: 'Test 33',
      email: uniqueEmail,
      password: '123456',
      password_confirmation: '123456'
    })

    expect(result.status).toBe(302)
    expect(result.header.location).toBe('/login')
  })

  it('should fail to register a new user with incorrect identities', async () => {
    const result = await supertest(web)
      .post('/register')
      .send({
        name: 'Test 33',
        email: uniqueEmail,
        password: '123456',
        password_confirmation: 'SALAH'
      })
      .set('Referer', '/register')

    expect(result.status).toBe(302)
    expect(result.header.location).toBe('/register')
  })
})

describe('GET /login - endpoint', () => {
  it('should be able to show login page', async () => {
    const result = await supertest(web).get('/login')

    expect(result.status).toBe(200)
    expect(result.text).toContain('Login')
    expect(result.text).toContain('Please sign in')
  })
})

describe('POST /login - endpoint', () => {
  beforeEach(async () => {
    await createTestUser(uniqueEmail)
  })
  afterEach(async () => {
    await removeTestUser(uniqueEmail)
  })

  it('should be able to login with correct identities', async () => {
    const result = await supertest(web).post('/login').send({
      email: uniqueEmail,
      password: '123456'
    })

    expect(result.status).toBe(302)
    expect(result.header.location).toBe('/dashboard')
  })

  it('should fail to login with incorrect identities', async () => {
    const result = await supertest(web)
      .post('/login')
      .send({
        email: uniqueEmail,
        password: 'SALAH'
      })
      .set('Referer', '/login')

    expect(result.status).toBe(302)
    expect(result.header.location).toBe('/login')
  })
})
