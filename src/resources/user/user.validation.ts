import Joi from 'joi';

const signUp = Joi.object({
  name: Joi.string().min(3).required(),
  login: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

const signIn = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

export default { signUp, signIn };
