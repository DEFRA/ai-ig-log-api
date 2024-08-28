import Joi from 'joi'
import { createProject } from '~/src/api/projects/helpers/create-project.js'

export const createProjectController = {
  options: {
    validate: {
      payload: Joi.object({
        id: Joi.string().uuid().required(),
        name: Joi.string().required()
      })
    }
  },
  handler: async (request, h) => {
    const project = await createProject(request.db, request.payload)
    return h.response(project).code(201)
  }
}
