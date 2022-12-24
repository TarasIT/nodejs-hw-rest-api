const Joi = require("joi");

const addRequestValitation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(1).max(50).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    number: Joi.string()
      .pattern(/^[0-9]+$/, "numbers")
      .min(3)
      .max(50)
      .required(),
  });
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message });
  }

  next();
};

module.exports = {
  addRequestValitation,
};
