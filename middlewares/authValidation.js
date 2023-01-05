const Joi = require("joi");
const { error } = require("../helpers/errors");

const addUserValitation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(5)
      .required(),
  });
  const validationResult = schema.validate(req.body);

  if (validationResult.error)
    return next(error(400, validationResult.error.message));

  next();
};

module.exports = {
  addUserValitation,
};
