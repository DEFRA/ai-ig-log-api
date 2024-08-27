import { UUID } from 'mongodb'
import { updateOne, findOne } from '~/src/api/helpers/db.js'

const collection = 'sessions'

async function deleteThread(db, sessionId, threadId) {
  await updateOne(
    db,
    collection,
    {
      sessionId: new UUID(sessionId)
    },
    {
      $pull: {
        threads: {
          threadId: new UUID(threadId)
        }
      }
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

export { deleteThread }
