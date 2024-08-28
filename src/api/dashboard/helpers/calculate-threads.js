import { aggregatetoNext } from '~/src/api/helpers/db.js'

const pipeline = (projectId) => {
  return [
    // Match documents with the specified project_id
    { $match: { project_id: projectId } },

    {
      $unwind: '$threads'
    },
    {
      $count: 'totalThreads'
    }
  ]
}

const calculateThreads = async (db, projectId) => {
  return await aggregatetoNext(db, 'sessions', pipeline(projectId))
}

export { calculateThreads }
