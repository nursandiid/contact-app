import express from 'express'
import authController from '../controllers/auth.controller.js'
import isAuthenticated from '../middleware/is-authenticated.js'
import isGuest from '../middleware/is-guest.js'

const authRouter = express.Router()

authRouter
  .get('/login', isGuest, authController.showLoginForm)
  .post('/login', isGuest, authController.login)
  .get('/register', isGuest, authController.showRegisterForm)
  .post('/register', isGuest, authController.register)
  .delete('/logout', isAuthenticated, authController.logout)

export default authRouter
