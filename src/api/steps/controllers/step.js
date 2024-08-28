import Joi from 'joi'
import Boom from '@hapi/boom'
import _ from 'lodash'
import { getStep } from '~/src/api/steps/helpers/get-step.js'

export const stepController = {
  options: {
    validate: {
      params: Joi.object({
        sessionId: Joi.string().uuid().required(),
        threadId: Joi.string().uuid().required(),
        stepId: Joi.string().uuid().required()
      })
    }
  },
  handler: async (request, h) => {
    const step = await getStep(
      request.db,
      request.params.sessionId,
      request.params.threadId,
      request.params.stepId
    )

    if (_.isNull(step)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', step }).code(200)
  }
}
