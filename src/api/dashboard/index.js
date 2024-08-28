import { dashboardController } from '~/src/api/dashboard/controllers/index.js'

export const dashboard = {
  plugin: {
    name: 'dashboard',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/projects/{projectId}/dashboard',
          ...dashboardController
        }
      ])
    }
  }
}
