const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, userSchema } = require("../db/userModel");
const { error } = require("../helpers/errors");

const registration = async (email, password, next) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) return existingUser;
  const user = new User({
    email,
    password,
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

const getUser = async (_id, token) => {
  const user = await User.findOne({ _id, token });
  return user;
};

const updateUserSubscription = async (_id, token, subscription, next) => {
  const subscriptionsList = userSchema.path("subscription").options.enum;

  if (!subscriptionsList.includes(subscription))
    return next(error(400, `${subscriptionsList.join(", ")} are available!`));

  await User.findOneAndUpdate({ _id, token }, { $set: { subscription } });
  const userWithNewSubscription = await User.findOne({ _id, token });
  return userWithNewSubscription;
};

module.exports = {
  registration,
  logIn,
  getUser,
  updateUserSubscription,
};
