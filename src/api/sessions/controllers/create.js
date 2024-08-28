import { createSession } from '~/src/api/sessions/helpers/create-session.js'
import sessionSchema from '~/src/api/helpers/schemas/session.js'

const createSessionController = {
  options: {
    validate: {
      payload: sessionSchema
    }
  },
  handler: async (request, h) => {
    const session = await createSession(request.db, request.payload)
    return h.response(session).code(201)
  }
}

export { createSessionController }
