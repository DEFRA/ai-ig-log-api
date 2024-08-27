import { UUID } from 'mongodb'
import { findOne } from '~/src/api/helpers/db.js'

const collection = 'sessions'

async function getSession(db, sessionId) {
  return await findOne(
    db,
    collection,
    {
      sessionId: new UUID(sessionId)
    },
    { _id: 0 }
  )
}

export { getSession }
