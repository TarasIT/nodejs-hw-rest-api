const { Contact } = require("../db/contactModel");

const getContacts = async (owner, page, limit) => {
  const contacts = await Contact.find({ owner }).skip(page).limit(limit);
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

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const { name, email, phone, favorite } = req.body;

  await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { name, email, phone, favorite },
    }
  );
  const updatedContact = await Contact.findById(contactId);
  return updatedContact;
};

const updateContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const { favorite } = req.body;

  await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { favorite },
    }
  );
  const updatedContact = await Contact.findById(contactId);
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
