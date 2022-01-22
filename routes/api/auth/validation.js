import Joi from 'joi'

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(20).required(),
})

export const validateAuth = async (req, res, next) => {
  try {
    await authSchema.validateAsync(req.body)
  } catch (err) {
    return res.status(400).json({ message: err.message.replace(/"/g, '') })
  }
  next()
}
