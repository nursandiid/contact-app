import supertest from 'supertest'
import web from '../../src/applications/web.js'
import { createTestUser, removeTestUser } from '../utils/user.util.js'

describe('GET /', () => {
  beforeEach(async () => {
    await removeTestUser()
    await createTestUser()
  })

  afterEach(async () => {
    await removeTestUser()
  })

  it('should redirect to /login if user does not login', async () => {
    const result = await supertest(web).get('/')

    expect(result.status).toBe(302)
    expect(result.header.location).toBe('/login')
  })

  it('should redirect to /dashboard if user has logged in', async () => {
    const agent = supertest.agent(web)

    await agent.post('/login').send({
      email: 'test@example.com',
      password: '123456'
    })
    const result = await agent.get('/')

    expect(result.status).toBe(302)
    expect(result.header.location).toBe('/dashboard')
  })
})
