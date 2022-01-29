import { httpCode } from '../../lib/constants.js'
import {
  UploadFileService,
  LocalFileStorage,
} from '../../service/storage/index.js'

const { OK } = httpCode

export const uploadAvatar = async (req, res, next) => {
  const upload = new UploadFileService(LocalFileStorage, req.file, req.user)
  const avatarUrl = await upload.updateAvatar()
  return res
    .status(OK)
    .json({ status: 'success', code: OK, data: { avatarUrl } })
}
