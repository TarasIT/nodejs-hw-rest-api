const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsService");

const listContactsController = async (req, res) => {
  try {
    const contacts = await getContacts();

    res.status(200).json({ contacts, message: "success" });
  } catch (error) {
    console.error(error);
  }
};

const getByIdController = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    res.status(200).json({ contact, message: "success" });
  } catch (error) {
    console.error(error);
  }
};

const addContactController = async (req, res) => {
  try {
    const { name, email, phone, favorite } = req.body;
    await addContact({ name, email, phone, favorite });

    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    console.error(error);
  }
};

const removeContactController = async (req, res) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);

    res.status(200).json({
      message: "The contact is successfully deleted!",
    });
  } catch (error) {
    console.error(error);
  }
};

const updateContactController = async (req, res) => {
  try {
    const contact = await updateContact(req, res);

    res.status(200).json({
      contact,
      message: "The contact is successfully updated!",
    });
  } catch (error) {
    console.error(error);
  }
};

const updateStatusContactController = async (req, res) => {
  try {
    const status = await updateStatusContact(req, res);

    res
      .status(200)
      .json({ message: `The favorite status changed to ${status}!` });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
