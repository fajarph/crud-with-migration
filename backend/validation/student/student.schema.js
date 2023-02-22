const Joi = require('joi')

const schema = {
    create: Joi.object({
        title: Joi.string().max(50).required().messages({
            "string.empty": "Name can't be empty!!",
            'string.max': 'Name length must be less than or equal to {{#limit}} characters long'
        }),
        email: Joi.string().max(255).required().messages({
            "any.required": "Email is required!!",
            "string.empty": "Email can't be empty!!"
        }),
        age: Joi.string().required().messages({
            "any.required": "Age is required!!",
            "string.empty": "Age can't be empty!!"
        }),
        CountryId: Joi.string().required().messages({
            "any.required": "Country is required!!",
            "string.empty": "Country can't be empty!!"
        }),
        HoroscopeId: Joi.string().required().messages({
            "any.required": "Horoscope is required!!",
            "string.empty": "Horoscope can't be empty!!"
        }),
        HobbyId: Joi.string().required().messages({
            "any.required": "Hobby is required!!",
            "string.empty": "Hobby can't be empty!!"
        }),
        gender: Joi.string().required().messages({
            "any.required": "Gender is required!!",
            "string.empty": "Gender can't be empty!!"
        }),
        file: Joi.string().messages({
            "any.required": "Image is required!!",
            "string.empty": "Image can't be empty!!"
        })
    })
    .options({abortEarly: false})
}

module.exports = schema