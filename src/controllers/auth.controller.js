import express from 'express'
import validate from '../validations/validation.js'
import {
  authRegisterValidation,
  authLoginValidation
} from '../validations/auth.validation.js'
import authService from '../services/auth.service.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const showRegisterForm = async (req, res, next) => {
  try {
    res.render('auth/register', {
      title: 'Register',
      layout: 'layouts/auth'
    })
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const register = async (req, res, next) => {
  try {
    const attributes = validate(authRegisterValidation, req.body)
    await authService.register(attributes)

    req.flash('success_msg', 'Thank you for signing up')
    res.redirect('/login')
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const showLoginForm = async (req, res, next) => {
  try {
    res.render('auth/login', {
      title: 'Login',
      layout: 'layouts/auth'
    })
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const login = async (req, res, next) => {
  try {
    const attributes = validate(authLoginValidation, req.body)
    const result = await authService.login(attributes)

    req.session.userId = result._id

    res.redirect('/dashboard')
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const logout = async (req, res, next) => {
  try {
    req.session.regenerate((err) => {
      if (!err) {
        req.flash('success_msg', 'Logout successful')
        return res.redirect('/login')
      }

      req.flash('error_msg', 'Logout is failed')
      res.redirect('/dashboard')
    })
  } catch (error) {
    next(error)
  }
}

export default { showRegisterForm, register, showLoginForm, login, logout }
