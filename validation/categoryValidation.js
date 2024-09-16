const Joi = require('joi');

const validateCategory = (data) => {
    const schema = Joi.object({
        categoryName: Joi.string().min(3).required(),
    });

    return schema.validate(data);
};

module.exports = { validateCategory };
