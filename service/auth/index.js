import {
  getUserById,
  getUserByEmail,
  createNewUser,
} from '../../repository/users.js'

class AuthService {
  async isUserExist(email) {
    const user = await getUserByEmail(email)
    return !!user
  }

  async createUser(body) {
    const { id, email, subscription } = await createNewUser(body)
    return { id, email, subscription }
  }
}

export default AuthService
