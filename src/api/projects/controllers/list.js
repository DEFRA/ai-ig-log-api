import { getProjects } from '~/src/api/projects/helpers/get-projects.js'

const projectsListController = {
  handler: async (request, h) => {
    const projects = await getProjects(request.db)

    return h.response({ message: 'success', projects }).code(200)
  }
}

export { projectsListController }
