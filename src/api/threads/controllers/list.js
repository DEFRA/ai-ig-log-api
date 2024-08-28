import Joi from 'joi'
import { getThreads } from '~/src/api/threads/helpers/get-threads.js'

export const threadsListController = {
  options: {
    validate: {
      params: Joi.object({
        sessionId: Joi.string().guid().required()
      })
    }
  },
  handler: async (request, h) => {
    const threads = await getThreads(request.db, request.params.sessionId)

    return h.response({ message: 'success', threads }).code(200)
  }
}
