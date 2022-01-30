import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from '../../repository/contacts.js'
import { httpCode } from '../../lib/constants.js'
import { CustomError } from '../../lib/customError.js'

const { OK, CREATED, BAD_REQUEST, NOT_FOUND } = httpCode

export const getContactsController = async (req, res, next) => {
  const { id: userId } = req.user
  const contacts = await listContacts(userId, req.query)
  res.status(OK).json({ status: 'success', code: OK, data: { ...contacts } })
}

export const getContactByIdController = async (req, res, next) => {
  const { id: userId } = req.user
  const { id } = req.params
  const contact = await getContactById(userId, id)
  if (contact) {
    return res
      .status(OK)
      .json({ status: 'success', code: OK, data: { contact } })
  }
  throw new CustomError(NOT_FOUND, 'Not found')
}

export const addContactController = async (req, res, next) => {
  const { id: userId } = req.user
  const newContact = await addContact(userId, req.body)
  res
    .status(CREATED)
    .json({ status: 'success', code: CREATED, data: { newContact } })
}

export const removeContactController = async (req, res, next) => {
  const { id: userId } = req.user
  const { id } = req.params
  const deleteContact = await removeContact(userId, id)
  if (deleteContact) {
    console.log(deleteContact)
    return res.status(OK).json({
      status: 'success',
      code: OK,
      contact: { deleteContact },
      message: 'contact deleted',
    })
  }
  throw new CustomError(NOT_FOUND, 'Not found')
}

export const updateContactController = async (req, res, next) => {
  const { id: userId } = req.user
  const { id } = req.params
  const changeContact = await updateContact(userId, id, req.body)
  if (req.body === null) {
    throw new CustomError(BAD_REQUEST, 'Missing fields')
  }
  if (updateContact) {
    return res.status(OK).json(changeContact)
  }
  throw new CustomError(NOT_FOUND, 'Not found')
}
