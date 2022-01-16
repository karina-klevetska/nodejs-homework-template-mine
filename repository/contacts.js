import Contact from '../model/contact.js'

export const listContacts = async ({
  sortBy,
  sortByDesc,
  filter,
  limit = 12,
  skip = 0,
}) => {
  let sortCriteria = null
  const total = await Contact.find().countDocuments()
  let result = Contact.find()
  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 }
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 }
  }
  if (filter) {
    result = result.select(filter.split('|').join(' '))
  }
  result = await result
    .skip(Number(skip))
    .limit(Number(limit))
    .sort(sortCriteria)
  return { total, contacts: result }
}

export const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId)
  return result
}

export const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId)
  return result
}

export const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

export const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  )
  return result
}
