import express from 'express'
import model from '../../model/index.js'
import { validateCreate, validateUpdate } from './validation.js'
const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts()
  console.log(contacts)
  res.status(200).json(contacts)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const contact = await model.getContactById(id)
  if (contact) {
    return res.status(200).json(contact)
  }
  res.status(404).json({ message: 'Not found' })
})

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await model.addContact(req.body)
  res.status(201).json(newContact)
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const deleteContact = await model.removeContact(id)
  if (deleteContact) {
    console.log(deleteContact)
    return res.status(200).json({ message: 'contact deleted' })
  }
  res.status(404).json({ message: 'Not found' })
})

router.put('/:id', validateUpdate, async (req, res, next) => {
  const { id } = req.params
  const updateContact = await model.updateContact(id, req.body)
  if (req.body === null) {
    return res.status(400).json({ message: 'missing fields' })
  }
  if (updateContact) {
    return res.status(200).json(updateContact)
  }
  res.status(404).json({ message: 'Not found' })
})

export default router
