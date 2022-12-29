const express = require("express");
const {
  listContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");
const { tryCatchWrapper } = require("../../helpers/apiHelpers");
const router = express.Router();
const {
  addRequestValitation,
  addIdValitation,
  addStatusValitation,
} = require("../../middlewares/validation");

router.get("/", tryCatchWrapper(listContactsController));
router.get("/:contactId", addIdValitation, tryCatchWrapper(getByIdController));
router.post("/", addRequestValitation, tryCatchWrapper(addContactController));
router.delete(
  "/:contactId",
  addIdValitation,
  tryCatchWrapper(removeContactController)
);
router.put(
  "/:contactId",
  addRequestValitation,
  addIdValitation,
  tryCatchWrapper(updateContactController)
);
router.patch(
  "/:contactId/favorite",
  addStatusValitation,
  addIdValitation,
  tryCatchWrapper(updateStatusContactController)
);

module.exports = router;
