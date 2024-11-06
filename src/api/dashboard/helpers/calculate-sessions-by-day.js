import { aggregatetoArray } from '~/src/api/helpers/db.js'

const pipeline = (projectId) => {
  return [
    // Match documents with the specified project_id
    { $match: { projectId } },

    {
      $project: {
        // Project the date in 'YYYY-MM-DD' format from createdAt or start_time
        sessionDate: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } // or "$start_time"
        }
      }
    },
    {
      $group: {
        _id: '$sessionDate',
        totalSessions: { $sum: 1 } // Count the number of sessions per day
      }
    },
    {
      $sort: { _id: 1 } // Sort by date in ascending order
    },
    {
      $project: {
        label: '$_id',
        value: '$totalSessions'
      }
    }
  ]
}

const calculateSessionsByDay = async (db, projectId) => {
  return await aggregatetoArray(db, 'sessions', pipeline(projectId))
}

export { calculateSessionsByDay }
