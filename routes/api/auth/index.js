import express from 'express'
import {
  signupController,
  loginController,
  logoutController,
} from '../../../controllers/auth/index.js'

const router = express.Router()

router.post('/signup', limiter(15 * 60 * 1000, 2), signupController)
router.post('/login', loginController)
router.post('/logout', logoutController)
// router.get('/current', guard, controllers.current)

export default router
