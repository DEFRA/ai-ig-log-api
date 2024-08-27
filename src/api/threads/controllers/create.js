import Joi from 'joi'
import { createThread } from '~/src/api/threads/helpers/create-thread.js'

const step = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  type: Joi.string().allow(null),
  start_time: Joi.date().required(),
  end_time: Joi.date().allow(null),
  model_name: Joi.string().required(),
  model_metadata: Joi.object().allow(null),
  input: Joi.string().required(),
  output: Joi.string().allow(null),
  input_tokens: Joi.number().allow(null),
  output_tokens: Joi.number().allow(null)
})

const createThreadController = {
  options: {
    validate: {
      params: Joi.object({
        sessionId: Joi.string().guid().required()
      }),
      payload: Joi.object({
        id: Joi.string().uuid().required(),
        name: Joi.string().required(),
        start_time: Joi.date().required(),
        end_time: Joi.date().allow(null),
        input: Joi.string().required(),
        output: Joi.string().allow(null),
        steps: Joi.array().items(step).allow(null)
      })
    }
  },
  handler: async (request, h) => {
    const thread = await createThread(
      request.db,
      request.params.sessionId,
      request.payload
    )
    return h.response(thread).code(201)
  }
}

export { createThreadController }
