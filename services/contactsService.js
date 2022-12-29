const { Contact } = require("../db/contactsModel");
const { httpError } = require("../helpers/apiHelpers");

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find();

  if (contacts.length === 0) return next(httpError(404, "No contacts"));

  return contacts;
};

const getContactById = async (contactId, res, next) => {
  const contact = await Contact.findById(contactId);
  if (!contact) return next(httpError(404, "Not found"));
  return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
};

const removeContact = async (contactId, res, next) => {
  const contact = await getContactById(contactId, res, next);

  if (contact) {
    await Contact.findByIdAndRemove(contactId);
    return true;
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;

  const contact = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });

  if (!contact) return next(httpError(404, "Not found"));

  const newContact = await Contact.findById(contactId);
  return newContact;
};

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const contact = await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });

  if (!contact) return next(httpError(404, "Not found"));

  return favorite;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
};
