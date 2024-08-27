import { UUID } from 'mongodb'
import { deleteOne, findOne } from '~/src/api/helpers/db.js'

const collection = 'sessions'

async function deleteSession(db, sessionId) {
  const result = await deleteOne(db, collection, {
    sessionId: new UUID(sessionId)
  })
  return await findOne(db, collection, { _id: result.insertedId }, { _id: 0 })
}

export { deleteSession }
