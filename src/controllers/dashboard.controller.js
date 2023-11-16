import express from 'express'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const index = async (req, res, next) => {
  try {
    res.render('dashboard', {
      title: 'Dashboard',
      layout: 'layouts/app'
    })
  } catch (error) {
    next(error)
  }
}

export default { index }
