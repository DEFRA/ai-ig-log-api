import Joi from 'joi'
import { createThread } from '~/src/api/threads/helpers/create-thread.js'
import threadSchema from '~/src/api/helpers/schemas/thread.js'

export const createThreadController = {
  options: {
    validate: {
      params: Joi.object({
        sessionId: Joi.string().guid().required()
      }),
      payload: threadSchema
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
