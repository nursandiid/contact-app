import User from '../models/User.js'
import ErrorMsg from '../errors/message.error.js'
import bcrypt from 'bcrypt'

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const register = async (attributes) => {
  let user = await User.findOne({
    email: attributes.email
  })

  if (user) {
    throw new ErrorMsg(400, 'Email already exists')
  }

  user = User.create({
    name: attributes.name,
    email: attributes.email,
    password: await bcrypt.hash(attributes.password, 10)
  })

  return user
}

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const login = async (attributes) => {
  let user = await User.findOne({
    email: attributes.email
  })

  if (!user) {
    throw new ErrorMsg('Email or password is wrong')
  }

  const passwordIsValid = await bcrypt.compare(
    attributes.password,
    user.password
  )

  if (!passwordIsValid) {
    throw new ErrorMsg(401, 'Email or password is wrong')
  }

  return user
}

export default { register, login }
