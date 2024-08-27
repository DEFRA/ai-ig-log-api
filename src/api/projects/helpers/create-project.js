import { UUID } from 'mongodb'
import { insertOne, findOne } from '~/src/api/helpers/db.js'

async function createProject(db, project) {
  const document = {
    ...project,
    projectId: new UUID(project.id),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const insertedId = await insertOne(db, 'projects', document)

  return await findOne(db, 'projects', { _id: insertedId }, { _id: 0 })
}

export { createProject }
