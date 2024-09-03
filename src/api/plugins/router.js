import { health } from '~/src/api/health/index.js'
import { projects } from '~/src/api/projects/index.js'
import { sessions } from '~/src/api/sessions/index.js'
import { threads } from '~/src/api/threads/index.js'
import { steps } from '~/src/api/steps/index.js'
import { dashboard } from '~/src/api/dashboard/index.js'
import { auth } from '~/src/api/auth/index.js'

/**
 * @satisfies { import('@hapi/hapi').ServerRegisterPluginObject<*> }
 */
const router = {
  plugin: {
    name: 'Router',
    register: async (server) => {
      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here.
      await server.register([
        auth,
        projects,
        sessions,
        threads,
        steps,
        dashboard
      ])
    }
  }
}

export { router }
