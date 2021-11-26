import { Joi } from "express-validation";

const componentValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    price: Joi.number().positive().required(),
    brand: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

export default componentValidation;
