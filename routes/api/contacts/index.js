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

const router = express.Router()

router.get('/', [guard, validateQuery], getContactsController)

router.get('/:id', [guard, validateId], getContactByIdController)

router.post('/', [guard, validateCreate], addContactController)

router.delete('/:id', [guard, validateId], removeContactController)

router.put('/:id', [guard, validateId, validateUpdate], updateContactController)

router.patch(
  '/:id/favorite',
  [guard, validateId, validateUpdateFavorite],
  updateContactController
)

export default router
