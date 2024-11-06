import Joi from 'joi'
import thread from '~/src/api/helpers/schemas/thread.js'

export default Joi.object({
  id: Joi.string().uuid().required(),
  projectId: Joi.string().uuid().required(),
  user: Joi.string().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().allow(null),
  threads: Joi.array().items(thread).allow(null)
})
