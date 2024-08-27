import Joi from 'joi'
import Boom from '@hapi/boom'
import _ from 'lodash'
import { deleteSession } from '~/src/api/sessions/helpers/delete-session.js'

const deleteSessionController = {
  options: {
    validate: {
      params: Joi.object({
        sessionId: Joi.string().required()
      })
    }
  },
  handler: async (request, h) => {
    const session = await deleteSession(request.db, request.params.sessionId)

    if (_.isNull(session)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', session }).code(200)
  }
}

export { deleteSessionController }
