import ErrorMsg from '../errors/message.error.js'
import Contact from '../models/Contact.js'

/**
 *
 * @param {*} attributes
 * @returns {array|object}
 */
const getAll = async (attributes = []) => {
  const contacts = await Contact.find()

  return contacts
}

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const create = async (attributes) => {
  let contact = await Contact.findOne({
    phone: attributes.phone
  })

  if (contact) {
    throw new ErrorMsg(400, 'Contact already exists')
  }

  contact = await Contact.create(attributes)

  return contact
}

/**
 *
 * @param {number} id
 * @returns {object}
 */
const get = async (id) => {
  const contact = await Contact.findById(id)

  if (!contact) {
    throw new ErrorMsg(404, 'Contact not found')
  }

  return contact
}

/**
 *
 * @param {number} id
 * @param {*} attributes
 * @returns {object}
 */
const update = async (id, attributes) => {
  let contact = await Contact.findById(id)

  if (!contact) {
    throw new ErrorMsg(404, 'Contact not found')
  }

  contact = await Contact.updateOne({ _id: id }, attributes)

  return contact
}

/**
 *
 * @param {number} id
 * @returns {null}
 */
const remove = async (id) => {
  let contact = await Contact.findById(id)

  if (!contact) {
    throw new ErrorMsg(404, 'Contact not found')
  }

  await Contact.deleteOne({ _id: id })

  return null
}

export default { getAll, create, get, update, remove }
