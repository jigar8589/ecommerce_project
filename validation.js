const Joi = require('joi')

const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(10).max(1000).required(),
    quantity: Joi.number().integer().min(1).required(),
    images: Joi.array().items(Joi.string().base64()).min(1).required(), // Expecting base64 encoded images in an array
    category_id: Joi.string().required(),
  });

const userSchema = Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName:  Joi.string().min(1).max(50).required(),
    email   :  Joi.string().email().required(),
    phoneNo :  Joi.number().min(10).max(10).required(),
    password:  Joi.string()
    .min(6) // Minimum 8 characters
    .max(30) // Maximum 30 characters
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{8,30}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, $, %).',

    })

})




const addressSchema = Joi.object({
    street: Joi.string().required().messages({
      'string.empty': 'Street is required',
    }),
    landmark: Joi.string().allow('').optional(), // Optional and can be empty
    city: Joi.string().required().messages({
      'string.empty': 'City is required',
    }),
    state: Joi.string().required().messages({
      'string.empty': 'State is required',
    }),
    country: Joi.string().default('India').required().messages({
      'string.empty': 'Country is required',
    }),
    pincode: Joi.number().integer().required().messages({
      'number.base': 'Pincode must be a number',
      'number.empty': 'Pincode is required',
    }),
    type: Joi.string().valid('House', 'office', 'Apartment', 'other').optional().messages({
      'any.only': 'Type must be one of [House, office, Apartment, other]',
    }),
    name: Joi.string().required().messages({
      'string.empty': 'Name is required',
    }),
    PhoneNo: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({
      'string.pattern.base': 'PhoneNo must be a valid 10-digit number',
      'string.empty': 'PhoneNo is required',
    }),
    isDefault: Joi.boolean().default(false).optional(),
    userId: Joi.string().hex().length(24).required().messages({
      'string.empty': 'User ID is required',
      'string.length': 'User ID must be a valid ObjectId (24 characters)',
    }),
  });




  module.exports = {
    productSchema,
    userSchema,
    addressSchema
  }