import jwt from 'jsonwebtoken'
import { getUserById } from '../repository/users.js'
import { httpCode } from '../lib/constants.js'

const { UNAUTHORIZED } = httpCode

const SECRET_KEY = process.env.JWT_SECRET_KEY

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY)
    return !!verify
  } catch (err) {
    return false
  }
}

const guard = async (req, res, next) => {
  const token = req.get('authorization')?.split(' ')[1]
  const isValidToken = verifyToken(token)

  if (!isValidToken) {
    res
      .status(UNAUTHORIZED)
      .json({ status: 'error', code: UNAUTHORIZED, message: 'Not authorized' })
  }
  const payload = jwt.decode(token)
  const user = await getUserById(payload.id)

  if (!user || user.token !== token) {
    res
      .status(UNAUTHORIZED)
      .json({ status: 'error', code: UNAUTHORIZED, message: 'Not authorized' })
  }
  req.user = user
  next()
}

export default guard
