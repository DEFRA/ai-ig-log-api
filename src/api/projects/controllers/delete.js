import Joi from 'joi'
import Boom from '@hapi/boom'
import _ from 'lodash'
import { deleteProject } from '~/src/api/projects/helpers/delete-project.js'

const deleteProjectController = {
  options: {
    validate: {
      params: Joi.object({
        projectId: Joi.string().uuid().required()
      })
    }
  },
  handler: async (request, h) => {
    const project = await deleteProject(request.db, request.params.projectId)

    if (_.isNull(project)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', project }).code(200)
  }
}

export { deleteProjectController }
