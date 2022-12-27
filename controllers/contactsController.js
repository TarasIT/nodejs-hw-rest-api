const { Contact } = require("../db/contactsModel");

const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (contacts.length === 0)
      return res.status(404).json({ message: "No contacts" });

    res.status(200).json({ contacts, message: "success" });
  } catch (error) {
    console.error(error);
  }
};

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ contact, message: "success" });
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const contact = new Contact({ name, email, phone });
    await contact.save();

    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    await Contact.findByIdAndRemove(contactId);

    res.status(200).json({
      message: "The contact is successfully deleted!",
    });
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const contact = await Contact.findByIdAndUpdate(contactId, {
      $set: { name, email, phone },
    });

    if (contact.length === 0)
      return res.status(404).json({ message: "Not found" });

    const newContact = await Contact.findById(contactId);
    res.status(200).json({
      newContact,
      message: "The contact is successfully updated!",
    });
  } catch (error) {
    console.error(error);
  }
};

const updateStatusContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const contact = await Contact.findByIdAndUpdate(contactId, {
      $set: { favorite },
    });

    console.log("contact --------------->", contact);

    if (!contact) return res.status(404).json({ message: "Not found" });

    res
      .status(200)
      .json({ message: `The favorite status changed to ${favorite}!` });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
