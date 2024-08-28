import Joi from 'joi'
import thread from '~/src/api/helpers/schemas/thread.js'

export default Joi.object({
  id: Joi.string().uuid().required(),
  project_id: Joi.string().uuid().required(),
  user: Joi.string().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().allow(null),
  threads: Joi.array().items(thread).allow(null)
})
