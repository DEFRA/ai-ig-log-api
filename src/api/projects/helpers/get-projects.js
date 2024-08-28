import { findMany } from '~/src/api/helpers/db.js'

export const getProjects = async (db) => {
  return await findMany(db, 'projects')
}
