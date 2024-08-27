import { findMany } from '~/src/api/helpers/db.js'

async function getProjects(db) {
  return await findMany(db, 'projects', {}, { _id: 0 })
}

export { getProjects }
