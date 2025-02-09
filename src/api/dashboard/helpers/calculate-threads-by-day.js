import { aggregatetoArray } from '~/src/api/helpers/db.js'

const pipeline = (projectId) => {
  return [
    // Match documents with the specified project_id
    { $match: { projectId } },

    // Project the necessary fields including date and the number of threads
    {
      $project: {
        date: {
          $dateToString: { format: '%Y-%m-%d', date: '$startTime' }
        },
        number_of_threads: { $size: '$threads' }
      }
    },

    // Group by date and sum the number of threads for each day
    {
      $group: {
        _id: '$date',
        total_threads: { $sum: '$number_of_threads' }
      }
    },

    {
      $project: {
        _id: 0,
        label: '$_id',
        value: '$total_threads'
      }
    },

    // Sort by date
    // prettier-ignore
    {
      $sort: { '_id': 1 } // eslint-disable-line
    }
  ]
}

async function calculateThreadsByDay(db, projectId) {
  return await aggregatetoArray(db, 'sessions', pipeline(projectId))
}

export { calculateThreadsByDay }
