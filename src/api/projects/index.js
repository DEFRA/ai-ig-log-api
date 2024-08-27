import {
  projectsListController,
  projectSessionsController,
  createProjectController,
  projectController,
  deleteProjectController
} from '~/src/api/projects/controllers/index.js'

const projects = {
  plugin: {
    name: 'projects',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/projects',
          ...projectsListController
        },
        {
          method: 'POST',
          path: '/projects',
          ...createProjectController
        },
        {
          method: 'GET',
          path: '/projects/{projectId}/sessions',
          ...projectSessionsController
        },
        {
          method: 'GET',
          path: '/projects/{projectId}',
          ...projectController
        },
        {
          method: 'DELETE',
          path: '/projects/{projectId}',
          ...deleteProjectController
        }
      ])
    }
  }
}

export { projects }
