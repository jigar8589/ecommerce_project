const Joi = require("joi");

// Validation schema for adding/updating an address
const validateAddress = (data) => {
  const schema = Joi.object({
    street: Joi.string().min(3).max(100).required(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).required(),
    postalCode: Joi.string().pattern(new RegExp("^[0-9]{5}$")).required(),
    country: Joi.string().min(2).max(50).required(),
    isDefault: Joi.boolean().optional(), // optional field
  });
  return schema.validate(data);
};

module.exports = {
  validateAddress,
};
