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
    "string.email": `Email must be a valid `,
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
    }),
});

const updateuser = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "any.required": `Email required`,
    "string.email": `Email must be a valid`,
    "string.empty": `Email should not be empty`,
  }),
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
  phoneNo: Joi.string().min(10).max(10).required().messages({
    "string.base": "Phone number must be a string",
    "any.required": `Phone number required`,
    "string.empty": `Phone number should not be empty`,
    "string.min": `Phone number should have a minimum length of {#limit}`,
    "string.max": `Phone number should have a maximum length of {#limit}`,
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
  price: Joi.string().min(0).required().messages({
    "string.min": "Price should be atleast 0",
    "any.required": "Price is required",
  }),
  description: Joi.string().min(10).max(200).required().messages({
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
  images: Joi.array().length(1).required().messages({
    "any.required": "Image is required",
    "array.min": "Atleast 1 image is required",
  }),
});

const updateProduct = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Product name must be a string",
    "any.required": `Product name required`,
    "string.empty": `Product name should not be empty`,
    "string.min": `Product name should have a minimum length of {#limit}`,
    "string.max": `Product name should have a maximum length of {#limit}`,
  }),
  price: Joi.string().min(0).required().messages({
    "string.min": "Price should be atleast 0",
    "any.required": "Price is required",
  }),
  description: Joi.string().min(10).max(200).required().messages({
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
  images: Joi.array().length(1).required().messages({
    "any.required": "Image is required",
    "array.min": "Atleast 1 image is required",
  }),
});

const deleteProduct = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Id is required",
  }),
});

const getProduct = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Id is required",
  }),
});

// category validations

const createCategory = Joi.object({
  categoryName: Joi.string().min(3).max(50).required().messages({
    "string.base": "Category name must be string",
    "any.required": "Category name is required",
    "string.min": "Category name must have minimum length of {#limit}",
    "string.max": "Category name must have maximum length of {#limit}",
  }),
});

const updateCategory = Joi.object({
  categoryName: Joi.string().min(3).max(50).required().messages({
    "string.base": "Category name must be string",
    "any.required": "Category name is required",
    "string.min": "Category name must be have minimum length of {#limit}",
    "string.max": "Category name must have maximum length of {#limit}",
  }),
});

const deleteCategory = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Id is required",
  }),
});

const getCategoryById = Joi.object({
  category_id: Joi.string().required().messages({
    "any.required": "Id is required",
  }),
});

// address validations

const createAddress = Joi.object({
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
  pincode: Joi.number().min(6).max(6).required().messages({
    "number.base": "pincode must be number",
    "any.required": "pincode is required",
    "number.min": "pincode must have a length of {#limit}",
    "number.max": "pincode must have a length of {#limit}",
    "number.empty": "pincode should not be empty",
  }),
  type: Joi.string().min(2).max(10).required().messages({
    "string.base": "type must be string",
    "any.required":
      "type is required and should be from House,Office,Apartement,other",
    "string.empty": "type should not be empty",
    "string.min": "type must have a length of {#limit}",
    "string.max": "type must have a length of {#limit}",
  }),
  name: Joi.string().min(5).max(10).required().messages({
    "string.base": "name must be string",
    "any.required": "name is required",
    "string.min": "name must have a length of {#length}",
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
  pincode: Joi.number().min(6).max(6).required().messages({
    "number.base": "pincode must be number",
    "any.required": "pincode is required",
    "number.min": "pincode must have a length of {#limit}",
    "number.max": "pincode must have a length of {#limit}",
    "number.empty": "pincode should not be empty",
  }),
  type: Joi.string().min(2).max(10).required().messages({
    "string.base": "type must be string",
    "any.required":
      "type is required and should be from House,Office,Apartement,other",
    "string.empty": "type should not be empty",
    "string.min": "type must have a length of {#limit}",
    "string.max": "type must have a length of {#limit}",
  }),
  name: Joi.string().min(5).max(10).required().messages({
    "string.base": "name must be string",
    "any.required": "name is required",
    "string.min": "name must have a length of {#length}",
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

const getAddressById=Joi.object({
  id:Joi.string().required().messages({
    "any.required":"id is required"
  })
})

const makeDefault=Joi.object({
  id:Joi.string().required().messages({
    "any.required":"id is required"
  })
})


// cart validations

const addProductToCart=Joi.object({
  UserId:Joi.string().required().messages({
    "any.required":"user id is required"
  }),
  productid:Joi.string().required().messages({
    "any.required":"product id is required"
  })
})

const updateProductToCart=Joi.object({
  productid:Joi.string().required().messages({
    "any.required":"product id is required"
  }),
  Quantity:Joi.number().min(1).required().messages({
    "any.required":"quantity is required",
    "number.min":"quantity must have a length of {#limit}",
    "number.empty":"quantity should not be empty"
  })
})

module.exports = {
  createUser,
  resetpassword,
  updateuser,
  createproduct,
  updateProduct,
  getProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  createAddress,
  updateAddress,
  getAddressById,
  makeDefault,
  addProductToCart,
  updateProductToCart
};
