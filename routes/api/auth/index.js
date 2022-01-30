import express from 'express'
import {
  signupController,
  loginController,
  logoutController,
  getCurrentUserController,
} from '../../../controllers/auth/index.js'
import { validateAuth } from './validation.js'
import guard from '../../../middlewares/guard.js'
import wrapperError from '../../../middlewares/errorHandler.js'

const router = express.Router()

router.post('/signup', validateAuth, wrapperError(signupController))
router.post('/login', validateAuth, wrapperError(loginController))
router.post('/logout', [guard, validateAuth], wrapperError(logoutController))
router.get('/current', guard, wrapperError(getCurrentUserController))

export default router
