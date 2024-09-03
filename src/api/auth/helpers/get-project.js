import { UUID } from 'mongodb'
import { findOne } from '~/src/api/helpers/db.js'

export const getProject = async (db, accessKey) => {
  const key = await findOne(
    db,
    'projects',
    { 'access_keys.key': new UUID(accessKey) },
    { _id: 0 }
  )

  return key
}
