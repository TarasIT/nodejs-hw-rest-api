const jwt = require("jsonwebtoken");
const { error } = require("../helpers/errors");
const { getUser } = require("../services/authService");

const authMiddleware = async (req, res, next) => {
  if (!req.headers["authorization"]) return next(error(401, "Not authorized"));

  const [tokenType, token] = req.headers["authorization"].split(" ");
  if (!token) return next(error(401, "Not authorized"));
  const { _id } = jwt.decode(token, process.env.JWT_SECRET);
  if (!_id) return next(error(401, "Not authorized"));
  const user = await getUser(_id, token);
  if (!user) return next(error(401, "Not authorized"));
  req.user = user;
  next();
};

module.exports = {
  authMiddleware,
};
