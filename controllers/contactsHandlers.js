const path = require("path");
const fs = require("fs").promises;
const nodeid = require("node-id");

const contactsPath = path.resolve(__dirname, "../db/contacts.json");

const getContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf8"));
};

const listContacts = async (req, res) => {
  try {
    const contacts = await getContacts();

    if (contacts.length === 0)
      return res.status(404).json({ message: "No contacts" });

    if (contacts.length !== 0)
      res.status(200).json({ contacts, message: "success" });
  } catch (error) {
    console.error(error);
  }
};

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contacts = await getContacts();
    const [contact] = contacts.filter((contact) => contact.id === contactId);

    if (!contact) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ contact, message: "success" });
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, number } = req.body;
    const contacts = await getContacts();

    contacts.push({
      id: nodeid(),
      name,
      email,
      number,
    });

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

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

    let contacts = await getContacts();
    contacts = contacts.filter((contact) => contact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

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
    const { name, email, number } = req.body;
    const contacts = await getContacts();

    const contact = contacts.filter((contact) => contact.id === contactId);

    if (contact.length === 0)
      return res.status(404).json({ message: "Not found" });

    contacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.email = email;
        contact.number = number;
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

    res
      .status(200)
      .json({ contact, message: "The contact is successfully updated!" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getContacts,
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
