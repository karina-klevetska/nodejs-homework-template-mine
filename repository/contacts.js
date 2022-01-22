import Contact from '../model/contact.js'

export const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = 20, skip = 0 }
) => {
  let sortCriteria = null
  const total = await Contact.find({ owner: userId }).countDocuments()
  let result = Contact.find({ owner: userId })
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

export const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId })
  return result
}

export const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  })
  return result
}

export const addContact = async (userId, body) => {
  const result = await Contact.create({ owner: userId, ...body })
  return result
}

export const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    { ...body },
    { new: true }
  )
  return result
}
