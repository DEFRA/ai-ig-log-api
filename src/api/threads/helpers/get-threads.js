import { UUID } from 'mongodb'
import { findOne } from '~/src/api/helpers/db.js'

const collection = 'sessions'

export const getThreads = async (db, sessionId) => {
  return await findOne(
    db,
    collection,
    {
      sessionId: new UUID(sessionId)
    },
    {
      _id: 0,
      threads: 1 // eslint-disable-line
    }
  )
}
