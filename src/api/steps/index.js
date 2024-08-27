import {
  createStepController,
  stepsListController,
  stepController,
  deleteStepController
} from '~/src/api/steps/controllers/index.js'

// prettier-ignore
const steps = {
  plugin: {
    name: 'steps',
    register: async (server) => { // eslint-disable-line
      server.route([
        {
          method: 'POST',
          path: '/sessions/{sessionId}/threads/{threadId}/steps',
          ...createStepController
        },
        {
          method: 'GET',
          path: '/sessions/{sessionId}/threads/{threadId}/steps',
          ...stepsListController
        },
        {
          method: 'GET',
          path: '/sessions/{sessionId}/threads/{threadId}/steps/{stepId}',
          ...stepController
        },
        {
          method: 'DELETE',
          path: '/sessions/{sessionId}/threads/{threadId}/steps/{stepId}',
          ...deleteStepController
        }
      ])
    }
  }
}

export { steps }
