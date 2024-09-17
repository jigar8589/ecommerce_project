const Joi = require("joi");

// Validation schema for creating a new product
const validateCreateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(1).required(),
    description: Joi.string().optional(),
    category_id: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
    images: Joi.array().items(Joi.string()).optional()
  });
  return schema.validate(data);
};

// Validation schema for updating a product
const validateUpdateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).optional(),
    price: Joi.number().min(1).optional(),
    description: Joi.string().optional(),
    category_id: Joi.string().optional(),
    quantity: Joi.number().min(0).optional(),
    images: Joi.array().items(Joi.string()).optional()
  });
  return schema.validate(data);
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct
};
