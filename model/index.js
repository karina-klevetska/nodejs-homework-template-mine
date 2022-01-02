import fs, { readFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const contacts = JSON.parse(
  await readFile(new URL('./contacts.json', import.meta.url))
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const listContacts = async () => {
  return contacts
}

const getContactById = async (contactId) => {
  const [result] = contacts.filter((contact) => contact.id === contactId)
  return result
}

const removeContact = async (contactId) => {
  const index = contacts.findIndex((contact) => contact.id === contactId)

  if (index !== -1) {
    const [deleteContact] = contacts.splice(index, 1)
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2)
    )
    return deleteContact
  }
}

const addContact = async ({ name, email, phone }) => {
  const newContact = { id: crypto.randomUUID(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(
    path.join(__dirname, 'contacts.json'),
    JSON.stringify(contacts, null, 2)
  )
  return newContact
}

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((contact) => contact.id === contactId)

  if (index !== -1) {
    const updatedContact = { id: contactId, ...contacts[index], ...body }
    contacts[index] = updatedContact
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2)
    )
    return updatedContact
  }
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
