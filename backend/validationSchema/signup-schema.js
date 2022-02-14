// validator class that contains all validation middleware and schemas
const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .min(1)
    .max(30)
    .required(),
  password: Joi.string()
    .min(16)
    .max(60)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
});

const validateParams = (
  params,
  options = {
    errors: {
      wrap: {
        label: '',
      },
    },
  }
) => {
  let param_errors = [];
  validation = signupSchema.validate(params, options);
  console.log(validation);
  if (validation.error) {
    validation.error.details.map((validationError) => {
      let singleError = {
        message: validationError.message,
        path: validationError.path,
      };
      param_errors.push(singleError);
    });
  }

  return [param_errors, validation.value];
};

module.exports = validateParams;
