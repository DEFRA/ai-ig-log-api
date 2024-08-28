import Joi from 'joi'
import Boom from '@hapi/boom'
import _ from 'lodash'
import { getProject } from '~/src/api/projects/helpers/get-project.js'

export const projectController = {
  options: {
    validate: {
      params: Joi.object({
        projectId: Joi.string().uuid().required()
      })
    }
  },
  handler: async (request, h) => {
    const project = await getProject(request.db, request.params.projectId)

    if (_.isNull(project)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', project }).code(200)
  }
}
