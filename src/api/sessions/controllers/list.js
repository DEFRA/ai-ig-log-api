import { getSessions } from '~/src/api/sessions/helpers/get-sessions.js'

const sessionsListController = {
  handler: async (request, h) => {
    const sessions = await getSessions(request.db)

    return h.response({ message: 'success', sessions }).code(200)
  }
}

export { sessionsListController }
