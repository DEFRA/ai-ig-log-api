import { log } from 'console'
import { aggregatetoArray } from '~/src/api/helpers/db.js'

async function getPaginatedCollection(
  db,
  collection,
  query,
  pageNumber,
  pageSize
) {
  const pipeline = [
    { $match: query },
    {
      $facet: {
        // Pipeline for fetching paginated results
        paginatedResults: [
          { $skip: (pageNumber - 1) * pageSize },
          { $limit: pageSize }
        ],
        // Pipeline for counting total documents
        totalCount: [{ $count: 'total' }]
      }
    },
    {
      $project: {
        // Reshape the result object
        paginatedResults: 1,
        total: { $arrayElemAt: ['$totalCount.total', 0] }
      }
    }
  ]
  try {
    const result = await aggregatetoArray(db, collection, pipeline)
    return result[0].paginatedResults
  } catch (error) {
    log('Error fetching paginated data:', error)
    return { paginatedResults: [], total: 0 }
  }
}

export { getPaginatedCollection }
