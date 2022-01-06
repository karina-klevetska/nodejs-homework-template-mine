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

const router = express.Router()

router.get('/', validateQuery, getContactsController)

router.get('/:id', validateId, getContactByIdController)

router.post('/', validateCreate, addContactController)

router.delete('/:id', validateId, removeContactController)

router.put('/:id', validateId, validateUpdate, updateContactController)

router.patch(
  '/:id/favorite',
  validateId,
  validateUpdateFavorite,
  updateContactController
)

export default router
