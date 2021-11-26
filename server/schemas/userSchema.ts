import { Joi } from "express-validation";

const userValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    email: Joi.string().email().required(),
    age: Joi.number().integer().required(),
  }),
};

export default userValidation;
