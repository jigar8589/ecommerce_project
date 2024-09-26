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
  newpassword: Joi.string()
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
  price: Joi.number().min(10).required().messages({
    "number.min": "Price should be atleast 10",
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
  images: Joi.array().required().messages({
    "any.required": "Image is required",
    "array.min": "Atleast 1 image is required",
  }),
});

const updateProduct = Joi.object({
  name: Joi.string().min(3).max(100).optional().messages({
    "string.base": "Product name must be a string",
    "any.required": `Product name required`,
    "string.empty": `Product name should not be empty`,
    "string.min": `Product name should have a minimum length of {#limit}`,
    "string.max": `Product name should have a maximum length of {#limit}`,
  }),
  price: Joi.number().min(10).optional().messages({
    "number.min": "Price minimum 10",
    "any.required": "Price is required",
  }),
  description: Joi.string().min(10).max(3000).optional().messages({
    "string.base": "Description must be a string",
    "any.required": "Description is required",
    "string.empty": "Description should not be empty",
    "string.min": "Description name should have a minimum length of {#limit}",
    "string.max": "Description name should have a maximum length of {#limit}",
  }),
  quantity: Joi.number().min(1).optional().messages({
    "number.base": "Quantity must be a number",
    "any.required": "Quantity is required",
    "number.empty": "Quantity should not be empty",
    "number.min": "Quantity number should be atleast {#limit}",
  }),
  images: Joi.array().optional().messages({
    "any.required": "Image is required",
    "array.length": "Atleast 1 image is required",
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
    "string.empty":"Category can't Emapty",   
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
  id: Joi.string().required().messages({
    "any.required": "Id is required",
  }),
});

// address validations

const createAddress = Joi.object({
  street: Joi.string().min(3).max(200).required().messages({
    "string.base": "Street name must be string",
    "any.required": "Street name is required",
    "string.min": "Street name must be have minimum length of {#limit}",
    "string.max": "String name must have maximum length of {#limit}",
    "string.empty": "Street name should not be empty",
  }),
  landmark: Joi.string().min(2).max(200).required().messages({
    "string.base": "landmark name must be string",
    "any.required": "landmark name is required",
    "string.min": "landmark name must be have minimum length of {#limit}",
    "string.max": "landmark name must have maximum length of {#limit}",
    "string.empty": "landmark name should not be empty",
  }),
  city: Joi.string().min(3).max(100).required().messages({
    "string.base": "city name must be string",
    "any.required": "city name is required",
    "string.min": "city name must be have minimum length of {#limit}",
    "string.max": "city name must have maximum length of {#limit}",
    "string.empty": "city name should not be empty",
  }),
  state: Joi.string().min(2).max(100).required().messages({
    "string.base": "state name must be string",
    "any.required": "state name is required",
    "string.min": "state name must be have minimum length of {#limit}",
    "string.max": "state name must have a maximum length of {#limit}",
    "string.empty": "state name should not be empty",
  }),
  country: Joi.string().min(2).max(100).required().messages({
    "string.base": "country name must be",
    "any.required": "country name is required",
    "string.min": "country name must have length of {#limit}",
    "string.max": "country name must have length of {#limit}",
    "string.empty": "country name should not be empty",
  }),
  pincode: Joi.string().length(6) // Ensures the value is an integer (no decimals)
  .messages({
    'string.base': 'Pincode must be a number',
    'string.length': 'Pincode must be exactly 6 digits long',
    'any.required': 'Pincode is required',
  }),
  type: Joi.string().min(2).max(10).
  valid('House', 'Office', 'Apartment', 'Other').required().messages({
    "string.base": "type must be string",
    "any.required":
      "type is required and should be from House,Office,Apartement,other",
    'any.only': 'Type must be one of House, Office, Apartment, or Other',
    "string.empty": "type should not be empty",
    "string.min": "type must have a length of {#limit}",
    "string.max": "type must have a length of {#limit}",
  }),
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "name must be string",
    "any.required": "name is required",
    "string.min": "name must have a length of {#length}",
    "string.max": "name must have a length of {#limit}",
    "string.empty": "name must not be empty",
  }),
  PhoneNo: Joi.string()
  .pattern(/^[0-9]{10}$/) // Ensures exactly 10 digits
  .required()
  .messages({
    "string.base": "Phone number must be a string",
    "string.empty": "Phone number should not be empty",
    "string.pattern.base": "Phone number must be exactly 10 digits long",
  
  }),
});

const updateAddress = Joi.object({
  street: Joi.string().min(3).max(100).required().messages({
    "string.base": "Street name must be string",
    "any.required": "Street name is required",
    "string.min": "Street name must be have minimum length of {#limit}",
    "string.max": "String name must have maximum length of {#limit}",
    "string.empty": "Street name should not be empty",
  }),
  landmark: Joi.string().min(2).max(100).required().messages({
    "string.base": "landmark name must be string",
    "any.required": "landmark name is required",
    "string.min": "landmark name must be have minimum length of {#limit}",
    "string.max": "landmark name must have maximum length of {#limit}",
    "string.empty": "landmark name should not be empty",
  }),
  city: Joi.string().min(3).max(100).required().messages({
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
  country: Joi.string().min(2).max(20).optional().messages({
    "string.base": "country name must be",
    "any.required": "country name is required",
    "string.min": "country name must have length of {#limit}",
    "string.max": "country name must have length of {#limit}",
    "string.empty": "country name should not be empty",
  }),
  pincode: Joi.string().length(6) // Ensures the value is an integer (no decimals)
  .messages({
    'string.base': 'Pincode must be a number',
    'string.length': 'Pincode must be exactly 6 digits long',
    'any.required': 'Pincode is required',
  }),
  type: Joi.string().min(2).max(10).required().messages({
    "string.base": "type must be string",
    "any.required":
      "type is required and should be from House,Office,Apartement,other",
    "string.empty": "type should not be empty",
    "string.min": "type must have a length of {#limit}",
    "string.max": "type must have a length of {#limit}",
  }),
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "name must be string",
    "any.required": "name is required",
    "string.min": "name must have a length of {#limit}",
    "string.max": "name must have a length of {#limit}",
    "string.empty": "name must not be empty",
  }),
  phoneNo: Joi.string()
  .pattern(/^[0-9]{10}$/) // Ensures exactly 10 digits
  .required()
  .messages({
    "string.base": "Phone number must be a string",
    "string.empty": "Phone number should not be empty",
    "string.pattern.base": "Phone number must be exactly 10 digits long",
  }),

})

// const getAddressById=Joi.object({
//   id:Joi.string().required().messages({
//     "any.required":"id is required"
//   })
// })

const makeDefault=Joi.object({
  id:Joi.string().required().messages({
    "any.required":"id is required"
  })
})


// cart validations

const addProductToCart = Joi.object({
  productId: Joi.string().required().messages({
    "string.empty": "Product ID is required"
  }),
  quantity: Joi.number().max(10).optional().strict().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity should be a number",
    "number.max": "Maximum quantity is 10"
  })
});


const updateProductToCart=Joi.object({
  productId:Joi.string().required().messages({
    "string.empty":"product id is required"
  }),
  quantity:Joi.number().min(1).max(10).required().messages({
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
  makeDefault,
  addProductToCart,
  updateProductToCart
};
