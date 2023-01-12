const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs").promises;
const { User, userSchema } = require("../db/userModel");
const { error } = require("../helpers/errors");

const registration = async (email, password, next) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) return existingUser;
  const user = new User({
    email,
    password,
    avatarURL: gravatar.url(email),
  });
  await user.save();
};

const logIn = async (email, password, next) => {
  const user = await User.findOne({ email });
  if (!user) return next(error(400, `No user with email '${email}' found`));
  if (!(await bcrypt.compare(password, user.password)))
    return next(error(400, `Wrong password`));
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: { token },
    }
  );
  return token;
};

const getUser = async (_id, token) => await User.findOne({ _id, token });

const updateUserSubscription = async (_id, token, subscription, next) => {
  const subscriptionsList = userSchema.path("subscription").options.enum;
  if (!subscriptionsList.includes(subscription))
    return next(error(400, `Only ${subscriptionsList.join(", ")} are available!`));
  const user = await User.findOneAndUpdate({ _id, token }, { $set: { subscription } }, {new: true});
  return user;
};

const updateUserAvatar = async (filename, _id, token) => {
  const user = await User.findOneAndUpdate(
    { _id, token },
    {
      $set: {
        avatarURL: `http://localhost:${process.env.PORT}/api/auth/users/avatars/${filename}`,
      },
    }, {new: true}
  );
  return user;
};

const resizeAndRelocateAvatar = async (path, filename) => {
  const image = await Jimp.read(path);
  image.resize(250, 250);
  await image.writeAsync(`tmp/${filename}`);
  fs.rename(`tmp/${filename}`, `public/avatars/${filename}`)
};

module.exports = {
  registration,
  logIn,
  getUser,
  updateUserAvatar,
  updateUserSubscription,
  resizeAndRelocateAvatar,
};
