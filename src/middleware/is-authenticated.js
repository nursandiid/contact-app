import express from 'express'
import User from '../models/User.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isAuthenticated = async (req, res, next) => {
  try {
    const userId = req.session.userId
    const user = await User.findById(userId)

    if (!user) {
      return res.redirect('/login')
    }

    req.user = user
    res.locals.user = user
    res.locals.isAuthenticated = typeof user !== 'undefined'

    next()
  } catch (error) {
    next(error)
  }
}

export default isAuthenticated
