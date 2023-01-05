const express = require("express");
const {
  registrationController,
  logInController,
  logOutController,
  currentUserController,
  updateSubscriptionController,
} = require("../../controllers/autnController");
const router = express.Router();
const { tryCatchWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { addUserValitation } = require("../../middlewares/authValidation");

router.patch(
  "/users",
  tryCatchWrapper(authMiddleware),
  tryCatchWrapper(updateSubscriptionController)
);
router.post(
  "/signup",
  addUserValitation,
  tryCatchWrapper(registrationController)
);
router.post("/login", addUserValitation, tryCatchWrapper(logInController));
router.get(
  "/logout",
  tryCatchWrapper(authMiddleware),
  tryCatchWrapper(logOutController)
);
router.get(
  "/current",
  tryCatchWrapper(authMiddleware),
  tryCatchWrapper(currentUserController)
);

module.exports = router;
