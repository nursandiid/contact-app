import Joi from 'joi'
import express from 'express'
import ErrorMsg from '../errors/message.error.js'

/**
 *
 * @param {Joi.ValidationError|ErrorMsg|Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next()
    return
  }

  if (err instanceof Joi.ValidationError) {
    req.flash('body', req.body)
    req.flash(
      'errors',
      err.details.map((detail) => ({
        name: detail.context.label,
        message: detail.message?.replaceAll('"', '')
      }))
    )

    res.status(err.status).redirect(req.get('referer') || '/')
  } else if (err instanceof ErrorMsg) {
    req.flash('body', req.body)
    req.flash('error_msg', err.message)

    res.status(err.status).redirect(req.get('referer') || '/')
  } else {
    res.status(500).render('errors/error', {
      title: 'Server Error',
      layout: 'layouts/error',
      status: 500,
      message: err.message
    })
  }
}

export default errorMiddleware
