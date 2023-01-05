const express = require("express");
const router = express.Router();
const {
  listContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateContactStatusController,
  favoriteContactsController,
} = require("../../controllers/contactsController");
const { tryCatchWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  addContactValitation,
  addIdValitation,
  addStatusValitation,
} = require("../../middlewares/contactsValidation");

router.use(tryCatchWrapper(authMiddleware));

router.get(
  "/",
  addStatusValitation,
  tryCatchWrapper(favoriteContactsController),
  tryCatchWrapper(listContactsController)
);

router.get("/:contactId", addIdValitation, tryCatchWrapper(getByIdController));
router.post("/", addContactValitation, tryCatchWrapper(addContactController));
router.delete(
  "/:contactId",
  addIdValitation,
  tryCatchWrapper(removeContactController)
);
router.put(
  "/:contactId",
  addContactValitation,
  addIdValitation,
  tryCatchWrapper(updateContactController)
);
router.patch(
  "/:contactId/favorite",
  addStatusValitation,
  addIdValitation,
  tryCatchWrapper(updateContactStatusController)
);

module.exports = router;
