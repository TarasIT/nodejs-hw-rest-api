const express = require("express");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactsControllers");
const router = express.Router();
const { addRequestValitation } = require("../../middlewares/validation");

router.get("/", listContacts);
router.get("/:contactId", getById);
router.post("/", addRequestValitation, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", addRequestValitation, updateContact);

module.exports = router;
