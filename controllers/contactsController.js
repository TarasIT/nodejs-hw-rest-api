const { error } = require("../helpers/errors");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
  getFavoriteContacts,
} = require("../services/contactsService");

const listContactsController = async (req, res, next) => {
  let { page, limit } = req.query;
  const { _id: owner } = req.user;

  limit = limit > 10 ? (limit = 10) : limit;
  page = page * limit - limit;

  const contacts = await getContacts(owner, page, limit);
  if (contacts.length === 0) return next(error(404, "No contacts"));
  res.status(200).json({ contacts, message: "success" });
};

const favoriteContactsController = async (req, res, next) => {
  if (!Object.prototype.hasOwnProperty.call(req.query, "favorite"))
    return next();

  const { _id: owner } = req.user;
  const { favorite } = req.query;
  const contacts = await getFavoriteContacts(owner, favorite);
  if (contacts.length === 0) return next(error(404, "No contacts"));
  res.status(200).json({ contacts, message: "success" });
};

const getByIdController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contact = await getContactById(contactId, owner, next);
  if (!contact) return next(error(404, "Not found"));
  res.status(200).json({ contact, message: "success" });
};

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;
  await addContact(req.body, owner);
  return res.status(201).json({
    message: "success",
  });
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const isContactDeleted = await removeContact(contactId, owner, res, next);
  if (!isContactDeleted) return;
  res.status(200).json({
    message: "The contact is successfully deleted!",
  });
};

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await updateContact(contactId, owner, req.body);
  if (!contact) return next(error(404, "Not found"));
  return res.status(200).json({
    contact,
    message: "The contact is successfully updated!",
  });
};

const updateContactStatusController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const { favorite } = req.body;
  const contact = await updateContactStatus(contactId, owner, favorite);
  if (!contact) return next(error(404, "Not found"));
  return res
    .status(200)
    .json({ message: `The favorite status is changed to ${contact.favorite}!` });
};

module.exports = {
  listContactsController,
  favoriteContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateContactStatusController,
};
