const { Contact } = require("../db/contactsModel");

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (contacts.length === 0)
      return res.status(404).json({ message: "No contacts" });

    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId, res) => {
  try {
    const contact = await Contact.findById(contactId);

    if (!contact) return res.status(404).json({ message: "Not found" });

    return contact;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async ({ name, email, phone, favorite }) => {
  try {
    const contact = new Contact({ name, email, phone, favorite });
    await contact.save();
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    await Contact.findByIdAndRemove(contactId);
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;

    const contact = await Contact.findByIdAndUpdate(contactId, {
      $set: { name, email, phone, favorite },
    });

    if (contact.length === 0)
      return res.status(404).json({ message: "Not found" });

    const newContact = await Contact.findById(contactId);
    return newContact;
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

    if (!contact) return res.status(404).json({ message: "Not found" });

    return favorite;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
