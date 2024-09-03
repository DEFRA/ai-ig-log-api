import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { config } from '~/src/config/index.js'
import { getProject } from '~/src/api/auth/helpers/get-project.js'

export const createAuthController = {
  options: {
    auth: false,
    validate: {
      payload: Joi.object({
        accessKey: Joi.string().uuid().required(),
        user: Joi.string().email().allow(null)
      })
    }
  },
  handler: async (request, h) => {
    const { accessKey } = request.payload

    const project = await getProject(request.db, accessKey)

    if (!project) {
      return h.response({ error: 'Invalid access key' }).code(401)
    }

    const payload = {
      projectId: project.projectId
    }

    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: '1h'
    })

    return h.response(token).code(201)
  }
}
