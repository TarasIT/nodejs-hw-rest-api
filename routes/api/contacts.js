const express = require("express");
const nodeid = require("node-id");
const router = express.Router();

let contacts = [
  { id: "1", name: "alex", email: "qwe@mail.com", number: "123" },
  { id: "2", name: "bob", email: "asdf@mail.com", number: "456" },
];

router.get("/", async (req, res) => {
  res.status(200).json({ contacts, message: "success" });
});

router.get("/:contactId", async (req, res) => {
  const [contact] = contacts.filter(
    (contact) => contact.id === req.params.contactId
  );
  res.json({ contact, message: "success" });
});

router.post("/", async (req, res) => {
  const { name, email, number } = req.body;

  contacts.push({
    id: nodeid(),
    name,
    email,
    number,
  });

  res.json({
    message: "The contact is successfully added to the contacts list!",
  });
});

router.delete("/:contactId", async (req, res) => {
  contacts = contacts.filter((contact) => contact.id !== req.params.contactId);
  res.json({
    message: "The contact is successfully deleted from the contacts list!",
  });
});

router.put("/:contactId", async (req, res) => {
  const { name, email, number } = req.body;
  contacts.forEach((contact) => {
    if (contact.id === req.params.contactId) {
      contact.name = name;
      contact.email = email;
      contact.number = number;
    }
  });
  res.json({ message: "The contact is successfully updated!" });
});

module.exports = router;
