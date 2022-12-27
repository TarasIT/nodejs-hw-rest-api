const express = require("express");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");
const router = express.Router();
const {
  addRequestValitation,
  addIdValitation,
  addStatusValitation,
} = require("../../middlewares/validation");

router.get("/", listContacts);
router.get("/:contactId", addIdValitation, getById);
router.post("/", addRequestValitation, addContact);
router.delete("/:contactId", addIdValitation, removeContact);
router.put("/:contactId", addRequestValitation, addIdValitation, updateContact);
router.patch(
  "/:contactId/favorite",
  addStatusValitation,
  addIdValitation,
  updateStatusContact
);

module.exports = router;
