import * as Joi from 'joi';

export const UserSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(20)
    .required(),
  password: Joi.string()
    .min(5)
    .max(20)
    .required(),
  email: Joi.string().email()
});

export const LoginSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(20)
    .required(),
  password: Joi.string()
    .min(5)
    .max(20)
    .required(),
  deviceType: Joi.string()
    .valid('android', 'browser')
    .required(),
  deviceId: Joi.string()
});
