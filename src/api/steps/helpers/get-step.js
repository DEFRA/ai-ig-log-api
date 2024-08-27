import { UUID } from 'mongodb'
import { findOne } from '~/src/api/helpers/db.js'

const collection = 'sessions'

async function getStep(db, sessionId, threadId, stepId) {
  const session = await findOne(
    db,
    collection,
    {
      sessionId: new UUID(sessionId)
    },
    {
      _id: 0
    }
  )
  const threds = session.threads.find(
    (thread) => thread.threadId.toString() === threadId
  )
  return threds.steps.find((step) => step.stepId.toString() === stepId)
}

export { getStep }
