import Joi from 'joi'
import { createSession } from '~/src/api/sessions/helpers/create-session.js'

const step = Joi.object({
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

const thread = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().allow(null),
  input: Joi.string().required(),
  output: Joi.string().allow(null),
  steps: Joi.array().items(step).allow(null)
})

const createSessionController = {
  options: {
    validate: {
      payload: Joi.object({
        id: Joi.string().uuid().required(),
        project_id: Joi.string().uuid().required(),
        user: Joi.string().required(),
        start_time: Joi.date().required(),
        end_time: Joi.date().allow(null),
        threads: Joi.array().items(thread).allow(null)
      })
    }
  },
  handler: async (request, h) => {
    const session = await createSession(request.db, request.payload)
    return h.response(session).code(201)
  }
}

export { createSessionController }
