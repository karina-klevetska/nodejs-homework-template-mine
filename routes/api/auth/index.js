import express from 'express'
import {
  signupController,
  loginController,
  logoutController,
  getCurrentUserController,
} from '../../../controllers/auth/index.js'
import { validateAuth } from './validation.js'
import guard from '../../../middlewares/guard.js'

const router = express.Router()

router.post('/signup', validateAuth, signupController)
router.post('/login', validateAuth, loginController)
router.post('/logout', [guard, validateAuth], logoutController)
router.get('/current', guard, getCurrentUserController)

export default router
