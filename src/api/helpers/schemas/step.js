import Joi from 'joi'

export default Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().allow(null),
  model_name: Joi.string().required(),
  model_metadata: Joi.object().allow(null),
  input: Joi.string().required(),
  output: Joi.string().allow(null),
  input_tokens: Joi.number().allow(null),
  output_tokens: Joi.number().allow(null)
})
