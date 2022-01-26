import Joi from 'joi';

export const loginValidation = (formData) => {
    const schema = Joi.object({
        Email : Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.empty': `"a" cannot be an empty field`
          }),
        Password: Joi.string().required(),
    })
    
    try {
        const value = schema.validate(formData , { abortEarly: false });
        return value;
    } catch (error) {
        console.log(error);
    }
}

export const registerValidation = (formData) => {
    const schema = Joi.object({
        Email : Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.empty': `"a" cannot be an empty field`
          }),
        password: Joi.string().min(6).alphanum().required(),
        Username: Joi.string().min(6).required(),
        Fullname: Joi.string().min(5).required(),
    })
    
    try {
        const value = schema.validate(formData , { abortEarly: false });
        return value;
    } catch (error) {
        console.log(error);
    }
}

export const contactValidation = (data) => {
    const schema = Joi.object({
        comment: Joi.string()
                .min(9).required(),
        email: Joi.string() 
                .min(9)
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
        subject: Joi.string()
                .min(9)
                .required(),
    });

    try {
        const value = schema.validate(data , { abortEarly: false });
        return value;
    } catch (error) {
        console.log(error);
    }
}