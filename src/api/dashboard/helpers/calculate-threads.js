import { aggregatetoNext } from '~/src/api/helpers/db.js'

function pipeline(projectId) {
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

async function calculateThreads(db, projectId) {
  return await aggregatetoNext(db, 'sessions', pipeline(projectId))
}

export { calculateThreads }
