import Joi from 'joi'
import { createStep } from '~/src/api/steps/helpers/create-step.js'

const createStepController = {
  options: {
    validate: {
      params: Joi.object({
        sessionId: Joi.string().guid().required(),
        threadId: Joi.string().guid().required()
      }),
      payload: Joi.object({
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
    }
  },
  handler: async (request, h) => {
    const step = await createStep(
      request.db,
      request.params.sessionId,
      request.params.threadId,
      request.payload
    )
    return h.response(step).code(201)
  }
}

export { createStepController }
