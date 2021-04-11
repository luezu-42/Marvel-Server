const Joi = require('joi');

const userRegister = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'br'] },
    })
    .required(),
  password: Joi.string().min(3).required(),

  repeatPassword: Joi.ref('password'),
});

const userUpdate = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'br'] },
    })
    .required(),
  password: Joi.string().min(3),

  repeatPassword: Joi.ref('password'),
});

const userLogin = Joi.object({
  email: Joi.string().required(),

  password: Joi.string().required(),
});
module.exports = { userRegister, userLogin, userUpdate };
