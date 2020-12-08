import Joi from "joi-browser"

// Collections of all form validators
const errorExtractor = (error) => {
  const { details } = error
  const errorObject = {}
  for (const detail of details) {
    errorObject[detail.context.key] = detail.message
  }
  return errorObject
}

const registrationFormSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
    .required()
    .error(() => {
      return {
        message:
          "Minimum six characters, at least one letter, one number and one special character",
      }
    }),
  confirmPassword: Joi.string().required(),
}).options({ abortEarly: false })

const loginFormSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false })

const checkInSchema = Joi.object({
  checkin: Joi.string()
    .regex(/(\d+\.?\d*)\s(hrs|hr)\s(#\S+)\s(.+)/)
    .required(),
}).options({ abortEarly: false })

const validateRegistrationForm = (data = {}) => {
  const { error } = registrationFormSchema.validate(data)
  console.log(registrationFormSchema.validate(data))
  if (error) {
    return { status: false, error: errorExtractor(error) }
  }
  return { status: true }
}

const validateLoginForm = (data = {}) => {
  const { error } = loginFormSchema.validate(data)
  if (error) {
    return { status: false, error: errorExtractor(error) }
  }
  return { status: true }
}

const validateCheckinForm = (data = {}) => {
  const { error } = checkInSchema.validate(data)
  if (error) {
    return { status: false, error: errorExtractor(error) }
  }
  return { status: true }
}

export default {
  validateRegistrationForm,
  validateLoginForm,
  validateCheckinForm,
}
