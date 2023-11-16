import express from 'express'
import dashboardController from '../controllers/dashboard.controller.js'
import isAuthenticated from '../middleware/is-authenticated.js'

const dashboardRouter = express.Router()

dashboardRouter.get('/', isAuthenticated, dashboardController.showIndexPage)

export default dashboardRouter
