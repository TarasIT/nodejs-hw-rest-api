const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require("../services/contactsService");

const listContactsController = async (req, res, next) => {
  const contacts = await getContacts();

  if (!contacts) return;

  res.status(200).json({ contacts, message: "success" });
};

const getByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, res, next);

  if (!contact) return;

  res.status(200).json({ contact, message: "success" });
};

const addContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  await addContact({ name, email, phone, favorite });

  return res.status(201).json({
    message: "success",
  });
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const isContactDeleted = await removeContact(contactId, res, next);

  if (!isContactDeleted) return;

  res.status(200).json({
    message: "The contact is successfully deleted!",
  });
};

const updateContactController = async (req, res, next) => {
  const contact = await updateContact(req, res, next);

  if (!contact) return;

  return res.status(200).json({
    contact,
    message: "The contact is successfully updated!",
  });
};

const updateContactStatusController = async (req, res, next) => {
  const status = await updateContactStatus(req, res, next);

  if (status === undefined) return;

  return res
    .status(200)
    .json({ message: `The favorite status changed to ${status}!` });
};

module.exports = {
  listContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateContactStatusController,
};
