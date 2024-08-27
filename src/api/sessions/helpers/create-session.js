import { UUID } from 'mongodb'
import { findOneAndUpdate } from '~/src/api/helpers/db.js'

const collection = 'sessions'

async function createSession(db, session) {
  const document = {
    ...session,
    sessionId: new UUID(session.id),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const options = { upsert: true, returnDocument: 'after' }
  const query = { sessionId: new UUID(session.id) }
  const response = await findOneAndUpdate(
    db,
    collection,
    query,
    document,
    options
  )

  return response
}

export { createSession }
