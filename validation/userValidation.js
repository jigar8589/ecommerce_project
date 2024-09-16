const Joi = require("joi");

// Validation schema for creating a new user
const validateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{8,30}$')).required(),
    otp: Joi.string().min(4).max(6).optional(),
  });
  return schema.validate(data);
};

// Validation schema for login
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Validation schema for resetting password
const validateResetPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    newpassword: Joi.string().min(6).required(),
    otp: Joi.string().min(4).max(6).required(),
  });
  return schema.validate(data);
};

// Add other validation schemas as required for other routes

module.exports = {
  validateUser,
  validateLogin,
  validateResetPassword,
};
