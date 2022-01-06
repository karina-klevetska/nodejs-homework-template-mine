import repositoryContacts from '../../repository/contacts.js'
import { httpCode } from '../../lib/constants.js'

const { OK, CREATED, BAD_REQUEST, NOT_FOUND } = httpCode

export const getContactsController = async (req, res, next) => {
  const contacts = await repositoryContacts.listContacts(req.query)
  res.status(OK).json({ status: 'success', code: OK, data: { ...contacts } })
}

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params
  const contact = await repositoryContacts.getContactById(id)
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
  const newContact = await repositoryContacts.addContact(req.body)
  res
    .status(CREATED)
    .json({ status: 'success', code: CREATED, data: { newContact } })
}

export const removeContactController = async (req, res, next) => {
  const { id } = req.params
  const deleteContact = await repositoryContacts.removeContact(id)
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
  const { id } = req.params
  const updateContact = await repositoryContacts.updateContact(id, req.body)
  if (req.body === null) {
    return res
      .status(BAD_REQUEST)
      .json({ status: 'error', code: BAD_REQUEST, message: 'missing fields' })
  }
  if (updateContact) {
    return res.status(OK).json(updateContact)
  }
  res
    .status(NOT_FOUND)
    .json({ status: 'error', code: NOT_FOUND, message: 'Not found' })
}
