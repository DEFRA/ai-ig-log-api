import Boom from '@hapi/boom'
import { log } from 'console'
import { findOne } from '~/src/api/helpers/db.js'

const authApiKey = {
  name: 'authApiKey',
  version: '1.0.0',
  register: async function (server, options) {
    // eslint-disable-line
    server.auth.scheme('api-key', () => {
      return {
        authenticate: async (request, h) => {
          try {
            const apiKey = request.headers['x-api-key'] || request.query.api_key

            if (!apiKey) {
              throw Boom.unauthorized('Missing API key')
            }

            const db = request.db
            const key = await findOne(
              db,
              'projects',
              { id: apiKey },
              { _id: 0 }
            )

            if (!key) {
              throw Boom.unauthorized('Invalid API key')
            }

            return h.authenticated({ credentials: { apiKey } })
          } catch (err) {
            log('Authentication error:', err.message, err.output.statusCode)

            return h
              .response({
                statusCode: err.output.statusCode || 500,
                error: err.output.payload.error || 'Internal Server Error',
                message:
                  err.message || 'An error occurred during authentication'
              })
              .code(err.output.statusCode || 500)
              .takeover()
          }
        }
      }
    })

    server.auth.strategy('api-key', 'api-key')
  }
}

export { authApiKey }
