import express from 'express'

import {
  validateCreate,
  validateUpdate,
  validateUpdateFavorite,
  validateId,
  validateQuery,
} from './validation.js'

import {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} from '../../../controllers/contacts/index.js'

import guard from '../../../middlewares/guard.js'
import wrapperError from '../../../middlewares/errorHandler.js'

const router = express.Router()

router.get('/', [guard, validateQuery], wrapperError(getContactsController))

router.get('/:id', [guard, validateId], wrapperError(getContactByIdController))

router.post('/', [guard, validateCreate], wrapperError(addContactController))

router.delete(
  '/:id',
  [guard, validateId],
  wrapperError(removeContactController)
)

router.put(
  '/:id',
  [guard, validateId, validateUpdate],
  wrapperError(updateContactController)
)

router.patch(
  '/:id/favorite',
  [guard, validateId, validateUpdateFavorite],
  wrapperError(updateContactController)
)

export default router
