import { getPaginatedCollection } from '~/src/api/helpers/pagination.js'

export const getProjectSessions = async (db, projectId) => {
  return await getPaginatedCollection(db, 'sessions', { projectId }, 1, 10)
}
