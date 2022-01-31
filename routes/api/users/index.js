import express from 'express'
import guard from '../../../middlewares/guard.js'
import { upload } from '../../../middlewares/upload.js'
import {
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} from '../../../controllers/users/index.js'
import wrapperError from '../../../middlewares/errorHandler.js'

const router = express.Router()

router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  wrapperError(uploadAvatar)
)
router.get('/verify/:verificationToken', wrapperError(verifyUser))
router.post('/verify', wrapperError(repeatEmailForVerifyUser))

export default router
