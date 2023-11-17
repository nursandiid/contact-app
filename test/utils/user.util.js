import User from '../../src/models/User.js'
import bcrypt from 'bcrypt'

export const createTestUser = async (email = 'test@example.com') => {
  await User.create({
    name: 'Test',
    email,
    password: await bcrypt.hash('123456', 10)
  })
}

export const removeTestUser = async (email = 'test@example.com') => {
  await User.deleteMany({ email })
}

export const getTestUser = async (email = 'test@example.com') => {
  return User.findOne({ email })
}
