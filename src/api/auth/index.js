import { createAuthController } from '~/src/api/auth/controller.js'

export const auth = {
  plugin: {
    name: 'auth',
    register: (server) => {
      server.route([
        {
          method: 'POST',
          path: '/auth',
          ...createAuthController
        }
      ])
    }
  }
}
