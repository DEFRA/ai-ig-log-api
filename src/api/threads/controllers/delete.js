import Joi from 'joi'
import Boom from '@hapi/boom'
import _ from 'lodash'
import { deleteThread } from '~/src/api/threads/helpers/delete-thread.js'

export const deleteThreadController = {
  options: {
    validate: {
      params: Joi.object({
        sessionId: Joi.string().uuid().required(),
        threadId: Joi.string().uuid().required()
      })
    }
  },
  handler: async (request, h) => {
    const thread = await deleteThread(
      request.db,
      request.params.sessionId,
      request.params.threadId
    )

    if (_.isNull(thread)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', thread }).code(200)
  }
}
