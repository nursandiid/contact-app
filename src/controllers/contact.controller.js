import express from 'express'
import contactService from '../services/contact.service.js'
import validate from '../validations/validation.js'
import {
  contactCreateValidation,
  contactUpdateValidation,
  contactIdValidation
} from '../validations/contact.validate.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const showIndexPage = async (req, res, next) => {
  try {
    const result = await contactService.getAll()

    res.render('contact/index', {
      title: 'Contacts',
      layout: 'layouts/app',
      contacts: result
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
const showCreateForm = async (req, res, next) => {
  try {
    res.render('contact/add', {
      title: 'Add Contact',
      layout: 'layouts/app'
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
const create = async (req, res, next) => {
  try {
    const attributes = validate(contactCreateValidation, req.body)
    await contactService.create(attributes)

    req.flash('success_msg', 'Contact successfully added')
    return res.redirect('/contacts')
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
const showDetailPage = async (req, res, next) => {
  try {
    const id = validate(contactIdValidation, req.params.id)
    const result = await contactService.get(id)

    res.render('contact/show', {
      title: 'Contact Detail',
      layout: 'layouts/app',
      contact: result
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
const showEditForm = async (req, res, next) => {
  try {
    const id = validate(contactIdValidation, req.params.id)
    const result = await contactService.get(id)

    res.render('contact/edit', {
      title: 'Edit Contact',
      layout: 'layouts/app',
      contact: result
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
const update = async (req, res, next) => {
  try {
    const id = validate(contactIdValidation, req.params.id)
    const attributes = validate(contactUpdateValidation, req.body)
    await contactService.update(id, attributes)
    
    req.flash('success_msg', 'Contact successfully updated')
    return res.redirect('/contacts')
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
const remove = async (req, res, next) => {
  try {
    const id = validate(contactIdValidation, req.params.id)
    await contactService.remove(id)

    req.flash('success_msg', 'Contact successfully deleted')
    return res.redirect('/contacts')
  } catch (error) {
    next(error)
  }
}

export default {
  showIndexPage,
  showCreateForm,
  create,
  showDetailPage,
  showEditForm,
  update,
  remove
}
