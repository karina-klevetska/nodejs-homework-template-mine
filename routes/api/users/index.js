import express from 'express'
import guard from '../../../middlewares/guard.js'
import { upload } from '../../../middlewares/upload.js'
import {
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} from '../../../controllers/users/index.js'

const router = express.Router()

router.patch('/avatars', guard, upload.single('avatar'), uploadAvatar)
router.get('/verify/:verificationToken', verifyUser)
router.post('/verify', repeatEmailForVerifyUser)

export default router
