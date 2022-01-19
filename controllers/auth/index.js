import { httpCode } from '../../lib/constants.js'
import AuthService from '../../service/auth/index.js'

const { OK, CREATED, CONFLICT, UNAUTHORIZED, NO_CONTENT } = httpCode
const authService = new AuthService()

export const signupController = async (req, res, next) => {
  const { email } = req.body
  const isUserExist = await authService.isUserExist(email)

  if (isUserExist) {
    res
      .status(CONFLICT)
      .json({ status: 'error', code: CONFLICT, message: 'Email in use' })
  }
  const data = await authService.createUser(req.body)
  res.status(CREATED).json({ status: 'success', code: CREATED, data })
}

export const loginController = async (req, res, next) => {
  const { email, password } = req.body
  const user = await authService.getUser(email, password)

  if (!user) {
    res.status(UNAUTHORIZED).json({
      status: 'error',
      code: UNAUTHORIZED,
      message: 'Email or password is wrong',
    })
  }
  const token = authService.getToken(user)
  await authService.setToken(user.id, token)
  res.status(OK).json({ status: 'success', code: OK, data: { token } })
}

export const logoutController = async (req, res, next) => {
  await authService.setToken(req.user.id, null)
  res.status(NO_CONTENT).json({ status: 'success', code: NO_CONTENT, data: {} })
}
