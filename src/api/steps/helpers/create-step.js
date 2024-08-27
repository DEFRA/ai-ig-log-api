import { UUID } from 'mongodb'
import { updateOne, findOne } from '~/src/api/helpers/db.js'

const collection = 'sessions'

async function createStep(db, sessionId, threadId, step) {
  const document = {
    ...step,
    stepId: new UUID(step.id),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  await updateOne(
    db,
    collection,
    {
      sessionId: new UUID(sessionId),
      'threads.threadId': new UUID(threadId)
    },
    {
      $push: {
        'threads.$.steps': document
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

export { createStep }
