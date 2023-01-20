const express = require("express");
const router = express.Router();
const path = require("path");
const { upload } = require("../../helpers/filesStorage");
const downloadFileDir = path.join(process.cwd(), "public/avatars");
const {
  registrationController,
  logInController,
  logOutController,
  currentUserController,
  userAvatarController,
  userSubscriptionController,
  verifyController,
  resendingLetterController,
} = require("../../controllers/autnController");
const { tryCatchWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  addUserValitation,
  emailValitation,
} = require("../../middlewares/authValidation");

router.patch(
  "/users",
  tryCatchWrapper(authMiddleware),
  tryCatchWrapper(userSubscriptionController)
);
router.get(
  "/users/verify/:verificationToken",
  tryCatchWrapper(verifyController)
);
router.post(
  "/users/verify",
  tryCatchWrapper(emailValitation),
  tryCatchWrapper(resendingLetterController)
);
router.use(
  "/users/avatars",
  tryCatchWrapper(authMiddleware),
  upload.single("avatar"),
  express.static(downloadFileDir),
  tryCatchWrapper(userAvatarController)
);

router.post(
  "/signup",
  addUserValitation,
  tryCatchWrapper(registrationController)
);
router.post("/login", addUserValitation, tryCatchWrapper(logInController));
router.get(
  "/current",
  tryCatchWrapper(authMiddleware),
  tryCatchWrapper(currentUserController)
);
router.get(
  "/logout",
  tryCatchWrapper(authMiddleware),
  tryCatchWrapper(logOutController)
);

module.exports = router;
