import { httpCode } from '../../lib/constants.js'
import authService from '../../service/auth/index.js'
import { EmailService, SendgridSender } from '../../service/email/index.js'
import { CustomError } from '../../lib/customError.js'

const { OK, CREATED, CONFLICT, UNAUTHORIZED, NO_CONTENT } = httpCode

export const signupController = async (req, res, next) => {
  const { email } = req.body
  const isUserExist = await authService.isUserExist(email)

  if (isUserExist) {
    throw new CustomError(CONFLICT, 'Email in use')
  }
  const userData = await authService.createUser(req.body)
  const emailService = new EmailService(
    process.env.NODE_ENV,
    new SendgridSender()
  )
  const isSendEmail = await emailService.sendVerifyEmail(
    email,
    userData.name,
    userData.verificationToken
  )
  delete userData.verificationToken
  res.status(CREATED).json({
    status: 'success',
    code: CREATED,
    data: { ...userData, isSendEmailVerify: isSendEmail },
  })
}

export const loginController = async (req, res, next) => {
  const { email, password } = req.body
  const user = await authService.getUser(email, password)

  if (!user) {
    throw new CustomError(UNAUTHORIZED, 'Email or password is wrong')
  } else {
    const token = authService.getToken(user)
    await authService.setToken(user.id, token)
    res.status(OK).json({
      status: 'success',
      code: OK,
      data: { user: { email, subscription: user.subscription }, token },
    })
  }
}

export const logoutController = async (req, res, next) => {
  await authService.setToken(req.user.id, null)
  return res
    .status(NO_CONTENT)
    .json({ status: 'success', code: NO_CONTENT, data: {} })
}

export const getCurrentUserController = async (req, res, next) => {
  if (req.user.id) {
    const user = await authService.getCurrent(req.user.id)
    return res.status(OK).json({
      status: 'success',
      code: OK,
      data: { user },
    })
  }
  throw new CustomError(UNAUTHORIZED, 'Not authorized')
}
