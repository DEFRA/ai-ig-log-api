import Joi from 'joi'
import { createStep } from '~/src/api/steps/helpers/create-step.js'
import stepSchema from '~/src/api/helpers/schemas/step.js'

export const createStepController = {
  options: {
    validate: {
      params: Joi.object({
        sessionId: Joi.string().guid().required(),
        threadId: Joi.string().guid().required()
      }),
      payload: stepSchema
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
