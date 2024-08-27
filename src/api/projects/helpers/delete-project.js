import { UUID } from 'mongodb'
import { deleteOne, findOne } from '~/src/api/helpers/db.js'

async function deleteProject(db, projectId) {
  const result = await deleteOne(db, 'projects', {
    projectId: new UUID(projectId)
  })
  return await findOne(db, 'projects', { _id: result.insertedId }, { _id: 0 })
}

export { deleteProject }
