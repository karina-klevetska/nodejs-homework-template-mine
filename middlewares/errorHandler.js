import { httpCode } from '../lib/constants.js'

const { BAD_REQUEST } = httpCode

const wrapperError = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next)
    return result
  } catch (err) {
    switch (err.name) {
      case 'CustomError':
        return res
          .status(err.status)
          .json({ status: 'error', code: err.status, message: err.message })
      case 'ValidationError':
        return res
          .status(BAD_REQUEST)
          .json({ status: 'error', code: BAD_REQUEST, message: err.message })
      default:
        next(err)
    }
  }
}
export default wrapperError
