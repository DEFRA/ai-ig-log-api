import { log } from 'console'
import Joi from 'joi'
import { getProjectSessions } from '~/src/api/projects/helpers/get-project-sessions.js'

export const projectSessionsController = {
  options: {
    validate: {
      params: Joi.object({
        projectId: Joi.string().uuid().required()
      })
    }
  },
  handler: async (request, h) => {
    log('GET /projects/{projectId}/sessions')
    const sessions = await getProjectSessions(
      request.db,
      request.params.projectId
    )

    return h.response({ message: 'success', sessions }).code(200)
  }
}
