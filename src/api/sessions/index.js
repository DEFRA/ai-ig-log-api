import {
  sessionsListController,
  createSessionController,
  sessionController,
  deleteSessionController
} from '~/src/api/sessions/controllers/index.js'

// prettier-ignore
const sessions = {
  plugin: {
    name: 'sessions',
    register: async (server) => { // eslint-disable-line 
      server.route([
        {
          method: 'GET',
          path: '/sessions',
          ...sessionsListController
        },
        {
          method: 'POST',
          path: '/sessions',
          ...createSessionController
        },
        {
          method: 'GET',
          path: '/sessions/{sessionId}',
          ...sessionController
        },
        {
          method: 'DELETE',
          path: '/sessions/{sessionId}',
          ...deleteSessionController
        }
      ])
    }
  }
}

export { sessions }
