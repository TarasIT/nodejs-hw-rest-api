const { error } = require("../helpers/errors");
const {
  registration,
  logIn,
  getUser,
  updateUserAvatar,
  updateUserSubscription,
  resizeAndRelocateAvatar,
  verifyUser,
  resendVerificationLetter,
} = require("../services/authService");

const registrationController = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await registration(email, password);
  if (existingUser) return next(error(409, "Email in use"));
  res.status(201).json({
    user: { email: `${email}`, subscription: "starter" },
  });
};

const logInController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await logIn(email, password, next);
  const { token, subscription } = user;
  if (!token) return next(error(401, "Not authorized"));
  res.status(200).json({
    user: { token, email, subscription },
  });
};

const verifyController = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await verifyUser(verificationToken);
  if (!user) return next(error(404, "User not found"));
  res.status(200).json({
    message: "Verification successful",
  });
};

const resendingLetterController = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return;
  const isLetterSent = await resendVerificationLetter(email, next);
  if (!isLetterSent) return;
  res.status(200).json({
    message: "Verification email sent",
  });
};

const currentUserController = async (req, res, next) => {
  const { _id, token } = req.user;
  const user = await getUser(_id, token);
  if (!user) return next(error(401, "Not authorized"));
  res.status(200).json({ email: `${user.email}`, subscription: "starter" });
};

const userSubscriptionController = async (req, res, next) => {
  const { _id, token } = req.user;
  const { subscription } = req.body;
  const user = await updateUserSubscription(_id, token, subscription, next);
  if (!user) return next(error(401, "Not authorized"));
  res
    .status(200)
    .json({ email: `${user.email}`, subscription: `${user.subscription}` });
};

const userAvatarController = async (req, res, next) => {
  const { _id, token } = req.user;
  const { path, filename } = req.file;
  await resizeAndRelocateAvatar(path, filename);
  const user = await updateUserAvatar(filename, _id, token);
  if (!user) return next(error(401, "Not authorized"));
  res.status(200).json({ avatarURL: `${user.avatarURL}` });
};

const logOutController = async (req, res, next) => {
  let { _id, token } = req.user;
  const user = await getUser(_id, token);
  if (!user) return next(error(401, "Not authorized"));
  token = null;
  res.status(204).json();
};

module.exports = {
  registrationController,
  verifyController,
  logInController,
  currentUserController,
  userSubscriptionController,
  userAvatarController,
  logOutController,
  resendingLetterController,
};
