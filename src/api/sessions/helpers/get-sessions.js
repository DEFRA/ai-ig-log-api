import { findMany } from '~/src/api/helpers/db.js'

const collection = 'sessions'

async function getSessions(db) {
  return await findMany(db, collection)
}

export { getSessions }
