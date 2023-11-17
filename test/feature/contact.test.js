import supertest from 'supertest'
import web from '../../src/applications/web.js'
import { createTestUser, removeTestUser } from '../utils/user.util.js'
import {
  createTestContact,
  removeTestContact,
  createDummyTestContacts,
  removeAllTestContacts,
  getTestContact
} from '../utils/contact.util.js'

const uniqueEmail = 'test11@example.com'

beforeAll(async () => {
  await removeTestUser(uniqueEmail)
  await createTestUser(uniqueEmail)
})

afterAll(async () => {
  await removeTestUser(uniqueEmail)
})

describe('GET /contacts', () => {
  beforeEach(async () => {
    await removeAllTestContacts()
    await createDummyTestContacts()
  })

  afterEach(async () => {
    await removeAllTestContacts()
  })

  it('should be able to show contacts page', async () => {
    const agent = supertest.agent(web)
    await agent.post('/login').send({
      email: uniqueEmail,
      password: '123456'
    })
    const result = await agent.get('/contacts')
    const contactsInserted = [
      'Contact 1',
      'Contact 2',
      'Contact 3',
      'Contact 4',
      'Contact 5'
    ]

    expect(result.status).toBe(200)
    expect(result.text).toContain('Contacts')
    contactsInserted.forEach((contact) => {
      expect(result.text).toContain(contact)
    })
  })
})

describe('GET /contacts/create - endpoint', () => {
  it('should be able to show form to add contact', async () => {
    const agent = supertest.agent(web)
    await agent.post('/login').send({
      email: uniqueEmail,
      password: '123456'
    })
    const result = await agent.get('/contacts/create')

    expect(result.status).toBe(200)
    expect(result.text).toContain('Add Contact')
  })
})

describe('POST /contacts - endpoint', () => {
  beforeEach(async () => {
    await removeTestContact()
  })

  afterEach(async () => {
    await removeTestContact()
  })

  it('should be able to add a new contact', async () => {
    const agent = supertest.agent(web)
    await agent.post('/login').send({
      email: uniqueEmail,
      password: '123456'
    })
    const result = await agent.post('/contacts').send({
      name: 'Test',
      phone: '+62 811'
    })

    expect(result.status).toBe(302)
    expect(result.text).toContain('/contacts')
  })

  it('should fail to add a new contact with empty fields', async () => {
    const agent = supertest.agent(web)
    await agent.post('/login').send({
      email: uniqueEmail,
      password: '123456'
    })
    const result = await agent
      .post('/contacts')
      .send({
        name: 'Test'
      })
      .set('Referer', '/contacts/create')

    expect(result.status).toBe(302)
    expect(result.text).toContain('/contacts/create')
  })
})

describe('GET /contacts/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestContact()
    await createTestContact()
  })

  afterEach(async () => {
    await removeTestContact()
  })

  it('should be able to show contact detail page', async () => {
    const contact = await getTestContact()
    const agent = supertest.agent(web)
    await agent.post('/login').send({
      email: uniqueEmail,
      password: '123456'
    })
    const result = await agent.get(`/contacts/${contact._id}`)

    expect(result.status).toBe(200)
    expect(result.text).toContain('Contact Detail')
    expect(result.text).toContain(contact.name)
    expect(result.text).toContain(contact.phone)
  })
})

describe('GET /contacts/:id/edit - endpoint', () => {
  beforeEach(async () => {
    await removeTestContact()
    await createTestContact()
  })

  afterEach(async () => {
    await removeTestContact()
  })

  it('should be able to show form to edit contact', async () => {
    const contact = await getTestContact()
    const agent = supertest.agent(web)
    await agent.post('/login').send({
      email: uniqueEmail,
      password: '123456'
    })
    const result = await agent.get(`/contacts/${contact._id}/edit`)

    expect(result.status).toBe(200)
    expect(result.text).toContain('Edit Contact')
  })
})

describe('PUT /contacts/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestContact()
    await createTestContact()
  })

  afterEach(async () => {
    await removeTestContact()
  })

  it('should be able to update selected contact', async () => {
    const contact = await getTestContact()
    const agent = supertest.agent(web)
    await agent.post('/login').send({
      email: uniqueEmail,
      password: '123456'
    })
    const result = await agent.put(`/contacts/${contact._id}`).send({
      name: 'Test updated',
      phone: '+62 811'
    })

    expect(result.status).toBe(302)
    expect(result.text).toContain('/contacts')
  })
})

describe('DELETE /contacts/:id - endpoint', () => {
  beforeEach(async () => {
    await removeTestContact()
    await createTestContact()
  })

  afterEach(async () => {
    await removeTestContact()
  })

  it('should be able to delete selected contact', async () => {
    const contact = await getTestContact()
    const agent = supertest.agent(web)
    await agent.post('/login').send({
      email: uniqueEmail,
      password: '123456'
    })
    const result = await agent.delete(`/contacts/${contact._id}`)

    expect(result.status).toBe(302)
    expect(result.text).toContain('/contacts')
  })
})
