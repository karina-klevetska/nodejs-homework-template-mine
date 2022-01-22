import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from '../../repository/contacts.js'
import { httpCode } from '../../lib/constants.js'

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
  res
    .status(NOT_FOUND)
    .json({ status: 'error', code: NOT_FOUND, message: 'Not found' })
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
  res
    .status(NOT_FOUND)
    .json({ status: 'error', code: NOT_FOUND, message: 'Not found' })
}

export const updateContactController = async (req, res, next) => {
  const { id: userId } = req.user
  const { id } = req.params
  const changeContact = await updateContact(userId, id, req.body)
  if (req.body === null) {
    return res
      .status(BAD_REQUEST)
      .json({ status: 'error', code: BAD_REQUEST, message: 'missing fields' })
  }
  if (updateContact) {
    return res.status(OK).json(changeContact)
  }
  res
    .status(NOT_FOUND)
    .json({ status: 'error', code: NOT_FOUND, message: 'Not found' })
}
