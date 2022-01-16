import { httpCode } from '../../lib/constants.js'
import AuthService from '../../service/auth/index.js'

const { OK, CREATED, BAD_REQUEST, NOT_FOUND, CONFLICT } = httpCode
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
  const contacts = await repositoryContacts.listContacts(req.query)
  res.status(OK).json({ status: 'success', code: OK, data: { ...contacts } })
}

export const logoutController = async (req, res, next) => {
  const contacts = await repositoryContacts.listContacts(req.query)
  res.status(OK).json({ status: 'success', code: OK, data: { ...contacts } })
}
