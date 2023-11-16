import Joi from 'joi'
import express from 'express'
import ErrorMsg from '../errors/message.error.js'

/**
 *
 * @param {Joi.ValidationError|ErrorMsg|Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @returns
 */
const notFoundMiddleware = (req, res) => {
  res.status(404).render('errors/error', {
    title: 'Page Not Found',
    layout: 'layouts/error',
    status: 404
  })
}

export default notFoundMiddleware
