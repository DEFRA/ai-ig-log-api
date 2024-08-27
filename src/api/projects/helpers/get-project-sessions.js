import { UUID } from 'mongodb'
import { findMany } from '~/src/api/helpers/db.js'

async function getProjectSessions(db, projectId) {
  return await findMany(
    db,
    'sessions',
    { project_id: new UUID(projectId) },
    { _id: 0 }
  )
}

export { getProjectSessions }
