import Joi from 'joi'
import Boom from '@hapi/boom'
import _ from 'lodash'
import { getSession } from '~/src/api/sessions/helpers/get-session.js'

const sessionController = {
  options: {
    validate: {
      params: Joi.object({
        sessionId: Joi.string().guid().required()
      })
    }
  },
  handler: async (request, h) => {
    const session = await getSession(request.db, request.params.sessionId)

    if (_.isNull(session)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', session }).code(200)
  }
}

export { sessionController }
