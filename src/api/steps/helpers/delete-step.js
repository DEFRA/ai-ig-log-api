import { UUID } from 'mongodb'
import { updateOne, findOne } from '~/src/api/helpers/db.js'

const collection = 'sessions'

export const deleteStep = async (db, sessionId, threadId, stepId) => {
  await updateOne(
    db,
    collection,
    {
      sessionId: new UUID(sessionId),
      'threads.threadId': new UUID(threadId)
    },
    {
      $pull: {
        'threads.$.steps': {
          stepId: new UUID(stepId)
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
    {
      _id: 0
    }
  )
}
