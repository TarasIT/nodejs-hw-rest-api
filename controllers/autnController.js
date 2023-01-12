const { error } = require("../helpers/errors");
const {
  registration,
  logIn,
  getUser,
  updateUserAvatar,
  updateUserSubscription,
  resizeAndRelocateAvatar,
} = require("../services/authService");

const registrationController = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await registration(email, password, next);
  if (existingUser) return next(error(409, "Email in use"));
  res.status(201).json({
    user: { email: `${email}`, subscription: "starter" },
  });
};

const logInController = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await logIn(email, password, next);
  if (!token) return next(error(401, "Not authorized"));
  res.status(200).json({
    user: { token: token, email: `${email}`, subscription: "starter" },
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
  logInController,
  currentUserController,
  userSubscriptionController,
  userAvatarController,
  logOutController,
};
