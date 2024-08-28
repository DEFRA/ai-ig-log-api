import { UUID } from 'mongodb'
import { updateOne, findOne } from '~/src/api/helpers/db.js'

const collection = 'sessions'

export const createThread = async (db, sessionId, thread) => {
  const document = {
    ...thread,
    threadId: new UUID(thread.id),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  await updateOne(
    db,
    collection,
    {
      sessionId: new UUID(sessionId)
    },
    {
      $push: { threads: document }
    }
  )
  return await findOne(
    db,
    collection,
    {
      sessionId: new UUID(sessionId)
    },
    { _id: 0 }
  )
}
