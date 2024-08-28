import { getPaginatedCollection } from '~/src/api/helpers/pagination.js'

export const getProjectSessions = async (db, projectId) => {
  return await getPaginatedCollection(
    db,
    'sessions',
    { project_id: projectId },
    1,
    10
  )
}
