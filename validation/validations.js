const Joi = require("joi");

// user validations

const createUser = Joi.object({
  firstName: Joi.string().required().min(2).max(100).messages({
    "string.base": "First name must be a string",
    "any.required": `First name required`,
    "string.empty": `First name should not be empty`,
    "string.min": `First name should have a minimum length oF {#limit}`,
    "string.max": `First name should have a maximum length of {#limit}`,
  }),
  lastName: Joi.string().min(2).max(100).required().messages({
    "string.base": "Last name must be a string",
    "any.required": `Last name required`,
    "string.empty": `Last name should not be empty`,
    "string.min": `Last name should have a minimum length of {#limit}`,
    "string.max": `Last name should have a maximum length of {#limit}`,
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "any.required": `Email required`,
    "string.email": `Email must be a valid email`,
    "string.empty": `Email should not be empty`,
    "string.min": `Email should have a minimum length of {#limit}`,
    "string.max": `Email should have a maximum length of {#limit}`,
  }),
  phoneNo: Joi.string().min(10).max(10).required().messages({
    "string.base": "Phone number must be a string",
    "any.required": `Phone number required`,
    "string.empty": `Phone number should not be empty`,
    "string.min": `Phone number should have a minimum length of {#limit}`,
    "string.max": `Phone number should have a maximum length of {#limit}`,
  }),
  password: Joi.string()
    .trim()
    .min(8)
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{8,30}$")
    )
    .messages({
      "string.base": "Password must be a string",
      "any.required": `Password is required`,
      "string.empty": `Password should not be empty`,
      "string.min": `Password should have a minimum length of {#limit}`,
      "string.max": `Password should have a maximum length of {#limit}`,
      "string.pattern.base":
        "Password contains 1 capital letter and number and special character",
    }),
});

const resetpassword = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "any.required": `Email required`,
    "string.email": `Email must be a valid`,
    "string.empty": `Email should not be empty`,
  }),
  newPassword: Joi.string()
    .min(8)
    .max(8)
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{8,30}$")
    )
    .messages({
      "string.base": "Password must be a string",
      "any.required": `Password is required`,
      "string.empty": `Password should not be empty`,
      "string.min": `Password should have a minimum length of {#limit}`,
      "string.max": `Password should have a maximum length of {#limit}`,
      "string.pattern.base":
        "Password contains 1 capital letter and number and special character",
    }),
  oldPassword: Joi.string()
    .min(8)
    .max(8)
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{8,30}$")
    )
    .messages({
      "string.base": "Password must be a string",
      "any.required": "Password is required",
      "string.empty": "Password should not be empty",
      "string.min": "Passowrd should have a minimum length of {#limit}",
      "string.max": "Password should have a maximum length of {#limit}",
      "string.pattern.base":
        "Password contains 1 capital letter and numbers and special character",
    }),
});

const updateuser = Joi.object({
  email: Joi.string().email().optional().messages({
    "string.base": "Email must be a string",
    "any.required": `Email required`,
    "string.email": `Email must be a valid`,
    "string.empty": `Email should not be empty`,
  }),
  firstName: Joi.string().optional().min(2).max(100).messages({
    "string.base": "First name must be a string",
    "any.required": `First name required`,
    "string.empty": `First name should not be empty`,
    "string.min": `First name should have a minimum length oF {#limit}`,
    "string.max": `First name should have a maximum length of {#limit}`,
  }),
  lastName: Joi.string().min(2).max(100).optional().messages({
    "string.base": "Last name must be a string",
    "any.required": `Last name required`,
    "string.empty": `Last name should not be empty`,
    "string.min": `Last name should have a minimum length of {#limit}`,
    "string.max": `Last name should have a maximum length of {#limit}`,
  }),
  phoneNo: Joi.string().min(10).max(10).optional().messages({
    "string.base": "Phone number must be a string",
    "any.required": `Phone number required`,
    "string.empty": `Phone number should not be empty`,
    "string.min": `Phone number should have a minimum length of {#limit}`,
    "string.max": `Phone number should have a maximum length of {#limit}`,
  }),
});

const forgetPassword = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be string",
    "any.required": "Email is required",
    "string.empty": "Email should not be empty",
    "string.email": "Email must be valid email",
  }),
  otp: Joi.number().min(4).max(4).required().messages({
    "number.base": "Otp should be number",
    "any.required": "otp is required",
    "number.min": "otp should have a minimum length of {#limit}",
    "number.max": "otp should have a maximum length of {#limit}",
    "number.empty": "otp should not be empty",
  }),
  newPassword: Joi.string()
    .min(8)
    .max(8)
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{8,30}$")
    )
    .messages({
      "string.base": "password should be string",
      "any.required": "password is required",
      "string.min": "password should have a minimum length of {#limit}",
      "string.max": "password should have a maximum length of {#limit}",
      "string.empty": "password should not be empty",
      "string.pattern.base":
        "Password contains 1 capital letter and numbers and special character",
    }),
});

const verifyuser = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "email should be string",
    "any.required": "email is required",
    "string.empty": "email should not be empty",
    "string.email": "email must be valid email",
  }),
  otp: Joi.number().max(4).required().messages({
    "number.base": "Otp should be number",
    "any.required": "otp is required",
    "number.min": "otp should have a minimum length of {#limit}",
    "number.max": "otp should have a maximum length of {#limit}",
  }),
});

// product validations

const createproduct = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Product name must be a string",
    "any.required": `Product name required`,
    "string.empty": `Product name should not be empty`,
    "string.min": `Product name should have a minimum length of {#limit}`,
    "string.max": `Product name should have a maximum length of {#limit}`,
  }),
  price: Joi.number().min(1).required().messages({
    "number.min": "Price should be atleast 1",
    "any.required": "Price is required",
    "number.base": "Price should be a number",
    "number.empty": "Price should not be empty",
  }),
  description: Joi.string().min(10).max(3000).required().messages({
    "string.base": "Description must be a string",
    "any.required": "Description is required",
    "string.empty": "Description should not be empty",
    "string.min": "Description name should have a minimum length of {#limit}",
    "string.max": "Description name should have a maximum length of {#limit}",
  }),
  quantity: Joi.number().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "any.required": "Quantity is required",
    "number.empty": "Quantity should not be empty",
    "number.min": "Quantity number should be atleast {#limit}",
  }),
  images: Joi.array().min(1).required().messages({
    "any.required": "Image is required",
    "array.min": "Atleast 1 image is required",
  }),
});

const updateProduct = Joi.object({
  name: Joi.string().min(3).max(100).optional().messages({
    "string.base": "Product name must be a string",
    "string.empty": "Product name should not be empty",
    "string.min": "Product name should have a minimum length of {#limit}",
    "string.max": "Product name should have a maximum length of {#limit}",
  }),
  price: Joi.number().min(1).optional().messages({
    "number.base": "Price should be a number",
    "number.min": "Price should be at least 1",
  }),
  description: Joi.string().min(10).max(200).optional().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description should not be empty",
    "string.min": "Description should have a minimum length of {#limit}",
    "string.max": "Description should have a maximum length of {#limit}",
  }),
  quantity: Joi.number().min(1).optional().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity should be at least {#limit}",
  }),
  images: Joi.array().min(1).optional().messages({
    "array.min": "At least 1 image is required",
  }),
});

// category validations

const createCategory = Joi.object({
  categoryName: Joi.string().min(3).max(50).required().messages({
    "string.base": "Category name must be string",
    "any.required": "Category name is required",
    "string.min": "Category name must have minimum length of {#limit}",
    "string.max": "Category name must have maximum length of {#limit}",
    "string.empty": "Categoty name should not be empty",
  }),
});

const updateCategory = Joi.object({
  categoryName: Joi.string().min(3).max(50).optional().messages({
    "string.base": "Category name must be string",
    "any.required": "Category name is required",
    "string.min": "Category name must be have minimum length of {#limit}",
    "string.max": "Category name must have maximum length of {#limit}",
    "string.empty": "Category name should not be empty",
  }),
});

// address validations

const createaddress = Joi.object({
  street: Joi.string().min(3).max(20).required().messages({
    "string.base": "Street name must be string",
    "any.required": "Street name is required",
    "string.min": "Street name must be have minimum length of {#limit}",
    "string.max": "String name must have maximum length of {#limit}",
    "string.empty": "Street name should not be empty",
  }),
  landmark: Joi.string().min(2).max(20).required().messages({
    "string.base": "landmark name must be string",
    "any.required": "landmark name is required",
    "string.min": "landmark name must be have minimum length of {#limit}",
    "string.max": "landmark name must have maximum length of {#limit}",
    "string.empty": "landmark name should not be empty",
  }),
  city: Joi.string().min(3).max(50).required().messages({
    "string.base": "city name must be string",
    "any.required": "city name is required",
    "string.min": "city name must be have minimum length of {#limit}",
    "string.max": "city name must have maximum length of {#limit}",
    "string.empty": "city name should not be empty",
  }),
  state: Joi.string().min(2).max(15).required().messages({
    "string.base": "state name must be string",
    "any.required": "state name is required",
    "string.min": "state name must be have minimum length of {#limit}",
    "string.max": "state name must have a maximum length of {#limit}",
    "string.empty": "state name should not be empty",
  }),
  country: Joi.string().min(2).max(20).required().messages({
    "string.base": "country name must be",
    "any.required": "country name is required",
    "string.min": "country name must have length of {#limit}",
    "string.max": "country name must have length of {#limit}",
    "string.empty": "country name should not be empty",
  }),
  pincode: Joi.string().length(6).required().messages({
    "number.base": "pincode must be number",
    "any.required": "pincode is required",
    "number.min": "pincode must have a length of {#limit}",
    "number.max": "pincode must have a length of {#limit}",
    "number.empty": "pincode should not be empty",
  }),
  type: Joi.string()
    .valid("House", "Office", "Apartement", "Other")
    .required()
    .messages({
      "string.base": "type must be string",
      "any.required":
        "type is required and should be from House,Office,Apartement,other",
      "string.empty": "type should not be empty",
      "string.min": "type must have a length of {#limit}",
      "string.max": "type must have a length of {#limit}",
    }),
  name: Joi.string().min(2).required().messages({
    "string.base": "name must be string",
    "any.required": "name is required",
    "string.min": "name must have a length of {#limit}",
    "string.max": "name must have a length of {#limit}",
    "string.empty": "name must not be empty",
  }),
  phoneNo: Joi.string().min(10).max(10).required().messages({
    "string.base": "Phone number must be a string",
    "any.required": `Phone number required`,
    "string.empty": `Phone number should not be empty`,
    "string.min": `Phone number should have a minimum length of {#limit}`,
    "string.max": `Phone number should have a maximum length of {#limit}`,
  }),
});

const updateAddress = Joi.object({
  street: Joi.string().min(3).max(20).optional().messages({
    "string.base": "Street name must be string",
    "any.required": "Street name is required",
    "string.min": "Street name must be have minimum length of {#limit}",
    "string.max": "String name must have maximum length of {#limit}",
    "string.empty": "Street name should not be empty",
  }),
  landmark: Joi.string().min(2).max(20).optional().messages({
    "string.base": "landmark name must be string",
    "any.required": "landmark name is required",
    "string.min": "landmark name must be have minimum length of {#limit}",
    "string.max": "landmark name must have maximum length of {#limit}",
    "string.empty": "landmark name should not be empty",
  }),
  city: Joi.string().min(3).max(50).optional().messages({
    "string.base": "city name must be string",
    "any.required": "city name is required",
    "string.min": "city name must be have minimum length of {#limit}",
    "string.max": "city name must have maximum length of {#limit}",
    "string.empty": "city name should not be empty",
  }),
  state: Joi.string().min(2).max(15).optional().messages({
    "string.base": "state name must be string",
    "any.required": "state name is required",
    "string.min": "state name must be have minimum length of {#limit}",
    "string.max": "state name must have a maximum length of {#limit}",
    "string.empty": "state name should not be empty",
  }),
  country: Joi.string().min(2).max(20).optional().messages({
    "string.base": "country name must be",
    "any.required": "country name is required",
    "string.min": "country name must have length of {#limit}",
    "string.max": "country name must have length of {#limit}",
    "string.empty": "country name should not be empty",
  }),
  pincode: Joi.number().min(6).max(6).optional().messages({
    "number.base": "pincode must be number",
    "any.required": "pincode is required",
    "number.min": "pincode must have a length of {#limit}",
    "number.max": "pincode must have a length of {#limit}",
    "number.empty": "pincode should not be empty",
  }),
  type: Joi.string().min(2).max(10).optional().messages({
    "string.base": "type must be string",
    "any.required":
      "type is required and should be from House,Office,Apartement,other",
    "string.empty": "type should not be empty",
    "string.min": "type must have a length of {#limit}",
    "string.max": "type must have a length of {#limit}",
  }),
  name: Joi.string().min(5).max(10).optional().messages({
    "string.base": "name must be string",
    "any.required": "name is required",
    "string.min": "name must have a length of {#length}",
    "string.max": "name must have a length of {#limit}",
    "string.empty": "name must not be empty",
  }),
  phoneNo: Joi.string().min(10).max(10).optional().messages({
    "string.base": "Phone number must be a string",
    "any.required": `Phone number required`,
    "string.empty": `Phone number should not be empty`,
    "string.min": `Phone number should have a minimum length of {#limit}`,
    "string.max": `Phone number should have a maximum length of {#limit}`,
  }),
});

// cart validations

const addProductTocart = Joi.object({
  userId: Joi.string().required().messages({
    "string.base": "user id should be string",
    "any.required": "user id is required",
    "string.empty": "user id should not be empty",
  }),
  productId: Joi.string().required().messages({
    "string.base": "product id should be string",
    "any.required": "product id is required",
    "string.empty": "product id should not be empty",
  }),
  quantity:Joi.number().min(1).required().strict().messages({
    "number.base": "quantity should be a number",
    "any.required": "quantity is required",
    "number.min": "quantity must have a length of {#limit}",
  })
});

const updateProductTocart = Joi.object({
  userId: Joi.string().optional().messages({
    "string.base": "user id should be string",
    "any.required": "user id is required",
    "string.empty": "user id should not be empty",
  }),
  productId: Joi.string().optional().messages({
    "string.base": "product is should be string",
    "any.required": "product id is required",
    "string.empty": "product id should not be empty",
  }),
  quantity: Joi.number().min(1).max(20).optional().strict().messages({
    "number.base": "quantity should be a number",
    "any.required": "quantity is required",
    "number.min": "quantity must have a length of {#limit}",
    "number.max": "qunanityt must have a length of {#limit}",
  }),
});

module.exports = {
  createUser,
  resetpassword,
  verifyuser,
  forgetPassword,
  updateuser,
  createproduct,
  updateProduct,
  createCategory,
  updateCategory,
  createaddress,
  updateAddress,
  addProductTocart,
  updateProductTocart,
};
