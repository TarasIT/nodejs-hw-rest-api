const Joi = require("joi");

const addContactValitation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(1).max(50).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string()
      .pattern(/^[0-9]+$/, "numbers")
      .min(3)
      .max(50)
      .required(),
    favorite: Joi.boolean(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error)
    return res.status(400).json({ message: validationResult.error.message });
  next();
};

const addIdValitation = (req, res, next) => {
  const schema = Joi.string().min(24).max(24);
  const validationResult = schema.validate(req.params.contactId);
  if (validationResult.error)
    return res.status(400).json({ message: validationResult.error.message });
  next();
};

const addStatusValitation = (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({ message: "missing field favorite" });

  const schemaValidation = Joi.object({
    favorite: Joi.boolean(),
  });
  const validationResult = schemaValidation.validate(req.body);
  if (validationResult.error)
    return res.status(400).json({ message: validationResult.error.message });
  next();
};

const addQueryParamsValidation = (req, res, next) => {
  const schemaValidation = Joi.object({
    favorite: Joi.boolean(),
    page: Joi.string().pattern(/^[0-9]+$/, "numbers"),
    limit: Joi.string().pattern(/^[0-9]+$/, "numbers"),
  });
  const validationResult = schemaValidation.validate(req.query);
  if (validationResult.error)
    return res.status(400).json({ message: validationResult.error.message });
  next();
};

module.exports = {
  addContactValitation,
  addIdValitation,
  addStatusValitation,
  addQueryParamsValidation,
};
