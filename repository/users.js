import User from '../model/user.js'

export const getUserById = async (userId) => {
  const result = await User.findById(userId)
  return result
}

export const getUserByEmail = async (email) => {
  const result = await User.findOne({ email })
  return result
}

export const createNewUser = async (body) => {
  const user = new User(body)
  return await user.save()
}

export const updateToken = async (id, token) => {
  const result = await User.updateOne({ _id: id }, { token })
  return result
}
