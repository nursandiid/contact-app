import mongoose from '../applications/database.js'

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  address: {
    type: String
  }
})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact