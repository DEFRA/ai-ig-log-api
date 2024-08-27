import { log } from 'console'
import { UUID } from 'mongodb'
import { findOne } from '~/src/api/helpers/db.js'

const collection = 'sessions'

async function getThread(db, sessionId, threadId) {
  const session = await findOne(
    db,
    collection,
    {
      sessionId: new UUID(sessionId)
    },
    { _id: 0 }
  )
  return session.threads.find((thread) => thread.id === threadId)
}

export { getThread }