const { Contact } = require("../db/contactModel");

const getContacts = async (owner, page, limit) => {
  const contacts = await Contact.find({ owner })
    .skip(parseInt(page))
    .limit(parseInt(limit));
  return contacts;
};

const getFavoriteContacts = async (owner, favorite) => {
  const contacts = await Contact.find({ owner, favorite });
  return contacts;
};

const getContactById = async (contactId, owner) => {
  const contact = await Contact.findOne({ _id: contactId, owner });
  return contact;
};

const addContact = async ({ name, email, phone, favorite }, owner) => {
  const contact = new Contact({ owner, name, email, phone, favorite });
  await contact.save();
};

const removeContact = async (contactId, owner, res) => {
  const contact = await getContactById(contactId, owner, res);
  if (contact) {
    await Contact.findByIdAndRemove(contactId);
    return true;
  }
};

const updateContact = async (contactId, owner, { name, email, phone, favorite }) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { name, email, phone, favorite },
    }, {new: true}
  );
  return updatedContact;
};

const updateContactStatus = async (contactId, owner, favorite) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { favorite },
    }, {new: true}
  );
  return updatedContact;
};

module.exports = {
  getContacts,
  getFavoriteContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
};
