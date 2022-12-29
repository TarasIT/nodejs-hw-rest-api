const express = require("express");
const {
  listContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");
const router = express.Router();
const {
  addRequestValitation,
  addIdValitation,
  addStatusValitation,
} = require("../../middlewares/validation");

router.get("/", listContactsController);
router.get("/:contactId", addIdValitation, getByIdController);
router.post("/", addRequestValitation, addContactController);
router.delete("/:contactId", addIdValitation, removeContactController);
router.put(
  "/:contactId",
  addRequestValitation,
  addIdValitation,
  updateContactController
);
router.patch(
  "/:contactId/favorite",
  addStatusValitation,
  addIdValitation,
  updateStatusContactController
);

module.exports = router;
