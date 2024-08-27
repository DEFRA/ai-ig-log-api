import {
  createThreadController,
  threadController,
  threadsListController,
  deleteThreadController
} from '~/src/api/threads/controllers/index.js'

// prettier-ignore
const threads = {
  plugin: {
    name: 'threads',
    register: async (server) => { // eslint-disable-line
      server.route([
        {
          method: 'GET',
          path: '/sessions/{sessionId}/threads/{threadId}',
          ...threadController
        },
        {
          method: 'GET',
          path: '/sessions/{sessionId}/threads',
          ...threadsListController
        },
        {
          method: 'POST',
          path: '/sessions/{sessionId}/threads',
          ...createThreadController
        },
        {
          method: 'DELETE',
          path: '/sessions/{sessionId}/threads/{threadId}',
          ...deleteThreadController
        }
      ])
    }
  }
}

export { threads }
