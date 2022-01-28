import express from 'express'
import guard from '../../../middlewares/guard.js'
import { upload } from '../../../middlewares/upload.js'
import { uploadAvatar } from '../../../controllers/users/index.js'

const router = express.Router()

router.patch('/avatars', guard, upload.single('avatar'), uploadAvatar)

export default router
