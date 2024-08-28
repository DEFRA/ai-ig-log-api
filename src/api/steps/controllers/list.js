import Joi from 'joi'
import { getSteps } from '~/src/api/steps/helpers/get-steps.js'

export const stepsListController = {
  options: {
    validate: {
      params: Joi.object({
        sessionId: Joi.string().uuid().required(),
        threadId: Joi.string().uuid().required()
      })
    }
  },
  handler: async (request, h) => {
    const steps = await getSteps(
      request.db,
      request.params.sessionId,
      request.params.threadId
    )

    return h.response({ message: 'success', steps }).code(200)
  }
}
