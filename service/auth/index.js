import jwt from 'jsonwebtoken'
import {
  getUserById,
  getUserByEmail,
  createNewUser,
  updateToken,
} from '../../repository/users.js'

const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
  async isUserExist(email) {
    const user = await getUserByEmail(email)
    return !!user
  }

  async createUser(body) {
    const { id, name, email, subscription, avatar, verificationToken } =
      await createNewUser(body)
    return { id, name, email, subscription, avatar, verificationToken }
  }

  async getUser(email, password) {
    const user = await getUserByEmail(email)
    const isValidPassword = await user?.isValidPassword(password)

    if (!isValidPassword || !user?.verify) {
      return null
    }
    return user
  }

  getToken(user) {
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    return token
  }

  async setToken(id, token) {
    return await updateToken(id, token)
  }

  async getCurrent(id) {
    return await getUserById(id)
  }
}

export default new AuthService()
