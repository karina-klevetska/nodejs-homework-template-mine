import express from 'express'
import {
  signupController,
  loginController,
  logoutController,
} from '../../../controllers/auth/index.js'

import guard from '../../../middlewares/guard.js'

const router = express.Router()

router.post('/signup', signupController)
router.post('/login', loginController)
router.post('/logout', guard, logoutController)
// router.get('/current', guard, controllers.current)

export default router
