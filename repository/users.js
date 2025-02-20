import User from '../model/user.js'

export const getUserById = async (userId) => {
  const result = await User.findById(userId)
  return result
}

export const getUserByEmail = async (email) => {
  const result = await User.findOne({ email })
  return result
}

export const getUserByVerificationToken = async (verificationToken) => {
  const result = await User.findOne({ verificationToken })
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

export const updateVerify = async (id, status) => {
  const result = await User.updateOne(
    { _id: id },
    { verify: status, verificationToken: null }
  )
  return result
}

export const updateAvatar = async (id, avatar) => {
  const result = await User.updateOne({ _id: id }, { avatar })
  return result
}
