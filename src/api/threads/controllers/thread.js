import Joi from 'joi'
import Boom from '@hapi/boom'
import _ from 'lodash'
import { getThread } from '~/src/api/threads/helpers/get-thread.js'

const threadController = {
  options: {
    validate: {
      params: Joi.object({
        sessionId: Joi.string().guid().required(),
        threadId: Joi.string().guid().required()
      })
    }
  },
  handler: async (request, h) => {
    const thread = await getThread(
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

export { threadController }
