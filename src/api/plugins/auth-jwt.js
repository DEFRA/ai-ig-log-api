import { log } from 'console'
import hapiAuthJwt2 from 'hapi-auth-jwt2'
import { config } from '~/src/config/index.js'

const validate = function (decoded) {
  log(decoded)
  if (decoded?.projectId) {
    return { isValid: true }
  } else {
    return { isValid: false }
  }
}

export const jwtAuthPlugin = {
  name: 'jwt-auth-plugin',
  version: '1.0.0',
  register: async function (server) {
    await server.register(hapiAuthJwt2)

    server.auth.strategy('jwt', 'jwt', {
      key: config.get('jwtSecret'),
      validate,
      verifyOptions: { algorithms: ['HS256'] }
    })

    server.auth.default('jwt')
  }
}
