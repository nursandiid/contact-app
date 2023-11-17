import supertest from 'supertest'
import web from '../../src/applications/web.js'
import {
  createTestUser,
  getTestUser,
  removeTestUser
} from '../utils/user.util.js'

const uniqueEmail = 'test44@example.com'

describe('GET /dashboard', () => {
  beforeEach(async () => {
    await removeTestUser(uniqueEmail)
    await createTestUser(uniqueEmail)
  })

  afterEach(async () => {
    await removeTestUser(uniqueEmail)
  })

  it('should redirect to /login if user does not login', async () => {
    const result = await supertest(web).get('/dashboard')

    expect(result.status).toBe(302)
    expect(result.header.location).toBe('/login')
  })

  it('should be able to show dashboard page if user has logged in', async () => {
    const user = await getTestUser(uniqueEmail)
    const agent = supertest.agent(web)
    await agent.post('/login').send({
      email: uniqueEmail,
      password: '123456'
    })
    const result = await agent.get('/dashboard')

    expect(result.status).toBe(200)
    expect(result.text).toContain('Learning NodeJS & Express')
    expect(result.text).toContain(`Hi, welcome back ${user.name}`)
  })
})
