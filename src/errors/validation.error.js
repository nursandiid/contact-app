export default class ValidationError {
  constructor(errors, body) {
    this.errors = errors ? errors : []
    this.body = body ? body : []
  }

  old(field) {
    let body = this.body[0]
    return body && body[field]
  }

  has(field) {
    const error = this.errors.find((err) => err.name == field)

    if (error) return true
    return false
  }

  msg(field) {
    const error = this.errors.find((err) => err.name == field)
    return error && error.message
  }
}
