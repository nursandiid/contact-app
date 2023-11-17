import Contact from '../../src/models/Contact.js'

const createTestContact = async () => {
  await Contact.create({
    name: 'Test',
    phone: '+62 811'
  })
}

const removeTestContact = async () => {
  await Contact.deleteMany({ phone: '+62 811' })
}

const createDummyTestContacts = async () => {
  let data = []
  for (let i = 1; i <= 30; i++) {
    data.push({
      name: `Contact ${i}`,
      phone: `+62 811${i}`
    })
  }

  await Contact.insertMany(data)
}

const removeAllTestContacts = async () => {
  await Contact.deleteMany({})
}

const getTestContact = async () => {
  return await Contact.findOne({ phone: '+62 811' })
}

export {
  createTestContact,
  removeTestContact,
  createDummyTestContacts,
  removeAllTestContacts,
  getTestContact
}
