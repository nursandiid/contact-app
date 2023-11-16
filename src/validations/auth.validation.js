import Joi from 'joi'

const authRegisterValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  password_confirmation: Joi.valid(Joi.ref('password')).messages({
    'any.only': 'password_confirmation does not match'
  })
})

const authLoginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export { authRegisterValidation, authLoginValidation }
