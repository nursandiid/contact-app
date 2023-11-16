import express from 'express'
import contactController from '../controllers/contact.controller.js'
import isAuthenticated from '../middleware/is-authenticated.js'

const contactRouter = express.Router()

contactRouter.use(isAuthenticated)

contactRouter
  .get('/', contactController.showIndexPage)
  .get('/create', contactController.showCreateForm)
  .post('/', contactController.create)
  .get('/:id', contactController.showDetailPage)
  .get('/:id/edit', contactController.showEditForm)
  .put('/:id', contactController.update)
  .delete('/:id', contactController.remove)

export default contactRouter
