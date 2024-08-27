import { getPaginatedCollection } from '~/src/api/helpers/pagination.js'

async function getProjectSessions(db, projectId) {
  return await getPaginatedCollection(
    db,
    'sessions',
    { project_id: projectId },
    1,
    10
  )
}
export { getProjectSessions }
