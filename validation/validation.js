import Joi from 'joi';

 
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

export const validateCommentData = (data) =>  {
        const formSchema = Joi.object({
            comment: Joi.string().required(),
            blogId:Joi.required()
        })

        const value = formSchema.validate(data , { abortEarly: false });
        return value ;
}

export const updateValidation = (formData) => {
    const schema = Joi.object({
        Email : Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages({
            'string.empty': `"a" cannot be an empty field`
          }),     
        Username: Joi.string().min(6),
        Fullname: Joi.string().min(5)
    })
    
    try {
        const value = schema.validate(formData , { abortEarly: false });
        return value;
    } catch (error) {
        console.log(error);
    }
}

export const validateBlogData = (data) =>  {
    const formSchema = Joi.object({
        Subtitle: Joi.string().required().min(2),
        Title: Joi.string().required().min(3),
        Description:Joi.string().required(),
        postBanner:Joi.string().required()
    })

    const value = formSchema.validate(data , { abortEarly: false });
    return value ;
}
export const validateUpdateData = (data) =>  {
    const formSchema = Joi.object({
        Subtitle: Joi.string().min(2),
        Title: Joi.string().min(3),
        Description:Joi.string(),
        postBanner:Joi.string(),
        _id:Joi.string().required()
    })

    const value = formSchema.validate(data , { abortEarly: false });
    return value ;
}