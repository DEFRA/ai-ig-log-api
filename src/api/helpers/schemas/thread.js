import Joi from 'joi'
import step from '~/src/api/helpers/schemas/step.js'

export default Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().allow(null),
  input: Joi.string().required(),
  output: Joi.string().allow(null).allow(''),
  steps: Joi.array().items(step).allow(null)
})
