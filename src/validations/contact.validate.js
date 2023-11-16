import Joi from 'joi'

const fields = {
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().optional().allow(''),
  address: Joi.string().optional().allow('')
}

const contactCreateValidation = Joi.object(fields)

const contactUpdateValidation = Joi.object(fields)

const contactIdValidation = Joi.string().required().label('contact_id')

export { contactCreateValidation, contactUpdateValidation, contactIdValidation }
