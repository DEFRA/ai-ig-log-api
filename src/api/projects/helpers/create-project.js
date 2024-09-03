import { UUID } from 'mongodb'
import { insertOne, findOne } from '~/src/api/helpers/db.js'

export const createProject = async (db, project) => {
  const document = {
    ...project,
    access_keys: [
      {
        key: new UUID(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    projectId: new UUID(project.id),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const insertedId = await insertOne(db, 'projects', document)

  return await findOne(db, 'projects', { _id: insertedId }, { _id: 0 })
}
