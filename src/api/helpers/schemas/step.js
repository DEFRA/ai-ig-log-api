import Joi from 'joi'

export default Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().allow(null),
  modelName: Joi.string().required(),
  modelMetadata: Joi.object().allow(null),
  input: Joi.string().required(),
  output: Joi.string().allow(null),
  inputTokens: Joi.number().allow(null),
  outputTokens: Joi.number().allow(null)
})
