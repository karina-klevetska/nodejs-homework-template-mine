import { httpCode } from '../../lib/constants.js'
import {
  UploadFileService,
  LocalFileStorage,
} from '../../service/storage/index.js'
import {
  getUserByVerificationToken,
  getUserByEmail,
  updateVerify,
} from '../../repository/users.js'
import { EmailService, SendgridSender } from '../../service/email/index.js'

const { OK, BAD_REQUEST, NOT_FOUND, UNPROCESSABLE_ENTITY } = httpCode

export const uploadAvatar = async (req, res, next) => {
  const upload = new UploadFileService(LocalFileStorage, req.file, req.user)
  const avatarUrl = await upload.updateAvatar()
  return res
    .status(OK)
    .json({ status: 'success', code: OK, data: { avatarUrl } })
}

export const verifyUser = async (req, res, next) => {
  const verificationToken = req.params.verificationToken
  const userFromToken = await getUserByVerificationToken(verificationToken)

  if (userFromToken) {
    await updateVerify(userFromToken.id, true)
    return res.status(OK).json({
      status: 'success',
      code: OK,
      data: { message: 'Verification successful' },
    })
  }
  res.status(NOT_FOUND).json({
    status: 'error',
    code: NOT_FOUND,
    data: { message: 'User not found' },
  })
}

export const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body
  const user = await getUserByEmail(email)

  if (user) {
    const { name, email, verificationToken } = user
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SendgridSender()
    )
    const isSendEmail = await emailService.sendVerifyEmail(
      email,
      name,
      verificationToken
    )
    if (isSendEmail) {
      return res.status(OK).json({
        status: 'success',
        code: OK,
        data: { message: 'Verification email sent' },
      })
    }
    res.status(UNPROCESSABLE_ENTITY).json({
      status: 'error',
      code: UNPROCESSABLE_ENTITY,
      data: { message: 'Unprocessable Entity' },
    })
  }
  res.status(NOT_FOUND).json({
    status: 'error',
    code: NOT_FOUND,
    data: { message: 'User not found' },
  })
}
