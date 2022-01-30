import { httpCode } from '../../lib/constants.js'
import authService from '../../service/auth/index.js'
import { EmailService, SendgridSender } from '../../service/email/index.js'

const { OK, CREATED, CONFLICT, UNAUTHORIZED, NO_CONTENT } = httpCode

export const signupController = async (req, res, next) => {
  try {
    const { email } = req.body
    const isUserExist = await authService.isUserExist(email)

    if (isUserExist) {
      return res
        .status(CONFLICT)
        .json({ status: 'error', code: CONFLICT, message: 'Email in use' })
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
  } catch (err) {
    next(err)
  }
}

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await authService.getUser(email, password)

    if (!user) {
      res.status(UNAUTHORIZED).json({
        status: 'error',
        code: UNAUTHORIZED,
        message: 'Email or password is wrong',
      })
    } else {
      const token = authService.getToken(user)
      await authService.setToken(user.id, token)
      res.status(OK).json({
        status: 'success',
        code: OK,
        data: { user: { email, subscription: user.subscription }, token },
      })
    }
  } catch (err) {
    next(err)
  }
}

export const logoutController = async (req, res, next) => {
  try {
    await authService.setToken(req.user.id, null)
    res
      .status(NO_CONTENT)
      .json({ status: 'success', code: NO_CONTENT, data: {} })
  } catch (err) {
    next(err)
  }
}

export const getCurrentUserController = async (req, res, next) => {
  try {
    if (req.user.id) {
      const user = await authService.getCurrent(req.user.id)
      res.status(OK).json({
        status: 'success',
        code: OK,
        data: { user },
      })
    } else {
      res.status(UNAUTHORIZED).json({
        status: 'error',
        code: UNAUTHORIZED,
        message: 'Not authorized',
      })
    }
  } catch (err) {
    next(err)
  }
}
