import Joi from 'joi'
import mongoose from 'mongoose'

const { Types } = mongoose

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool().optional(),
})

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.bool().optional(),
}).or('name', 'email', 'phone', 'favorite')

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
})

const regLimit = /\d+/

const querySchema = Joi.object({
  sortBy: Joi.string().valid('name', 'email', 'phone').optional(),
  sortByDesc: Joi.string().valid('name', 'email', 'phone').optional(),
  filter: Joi.string().valid('name', 'email', 'phone').optional(),
  limit: Joi.string().pattern(regLimit).optional(),
  skip: Joi.string().pattern(regLimit).optional(),
})

export const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body)
  } catch (err) {
    return res.status(400).json({ message: err.message.replace(/"/g, '') })
  }
  next()
}

export const validateUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body)
  } catch (err) {
    const [{ type }] = err.details
    if (type === 'object.missing') {
      return res.status(400).json({ message: 'missing fields' })
    }
    return res.status(400).json({ message: err.message })
  }
  next()
}

export const validateUpdateFavorite = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body)
  } catch (err) {
    const [{ type }] = err.details
    if (type === 'object.missing') {
      return res.status(400).json({ message: 'missing fields' })
    }
    return res.status(400).json({ message: err.message })
  }
  next()
}

export const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ObjectId' })
  }
  next()
}

export const validateQuery = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query)
  } catch (err) {
    return res.status(400).json({ message: err.message.replace(/"/g, '') })
  }
  next()
}
