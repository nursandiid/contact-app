import express from 'express'
import ValidationError from '../errors/validation.error.js'

/**
 * Global variables for response, can be accessed in ejs
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const globalVariables = async (req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.errors = new ValidationError(
    req.flash('errors'),
    req.flash('body')
  )

  next()
}

export default globalVariables
