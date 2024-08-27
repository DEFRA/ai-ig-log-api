import { UUID } from 'mongodb'
import { findOne } from '~/src/api/helpers/db.js'

async function getProject(db, projectId) {
  return await findOne(
    db,
    'projects',
    { projectId: new UUID(projectId) },
    { _id: 0 }
  )
}

export { getProject }