import fs from 'fs/promises'
import path from 'path'
import { updateAvatar } from '../../repository/users.js'

class LocalStorage {
  constructor(file, user) {
    this.userId = user.id
    this.filename = file.filename
    this.filePath = file.path
    this.PUBLIC_DIR = process.env.PUBLIC_DIR
  }

  async save() {
    const saveDir = path.join(this.PUBLIC_DIR, 'avatars', this.userId)
    await fs.mkdir(saveDir, { recursive: true })
    await fs.rename(this.filePath, path.join(saveDir, this.filename))
    const avatarUrl = path.normalize(path.join(this.userId, this.filename))
    await updateAvatar(this.userId, avatarUrl)
    return avatarUrl
  }
}

export default LocalStorage
