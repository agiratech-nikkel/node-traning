const Joi = require('joi')

const userValidation = Joi.object().keys
({
    name: Joi.string().required().messages({
        "string.base" : `"Name" should  be a string`,
        'string.empty': `"Name" should not be a empty `,
        'any.required': `"Name is required"`
    }),
    email: Joi.string().email().required()
    .messages({
        "string.base" : `"Email" should be a string`,
        'string.empty': `"Email" should be a empty `,
        'any.required': `"Email" is required"`,
        'any.email':`"Email" should be valid`
    })
})

module.exports = {
    userValidation
}   