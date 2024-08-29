import { aggregatetoArray } from '~/src/api/helpers/db.js'
import { calculateCost } from '~/src/api/dashboard/helpers/calculate-cost.js'

const pipeline = (projectId) => {
  return [
    { $match: { project_id: projectId } },
    { $unwind: '$threads' },
    { $unwind: '$threads.steps' },
    {
      $group: {
        _id: {
          day: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$threads.start_time'
            }
          },
          model: '$threads.steps.model_name'
        },
        totalInputTokens: { $sum: '$threads.steps.input_tokens' },
        totalOutputTokens: { $sum: '$threads.steps.output_tokens' }
      }
    },
    {
      $addFields: {
        totalTokens: { $sum: ['$totalInputTokens', '$totalOutputTokens'] }
      }
    },
    {
      $project: {
        _id: 0,
        day: '$_id.day',
        model: '$_id.model',
        totalInputTokens: 1,
        totalOutputTokens: 1,
        totalTokens: 1,
        cost: 1
      }
    },
    {
      $sort: { day: 1, model: 1 }
    }
  ]
}

const calculateTokenUsageByModel = async (db, projectId) => {
  const usage = await aggregatetoArray(db, 'sessions', pipeline(projectId))
  return calculateCost(usage)
}

export { calculateTokenUsageByModel }
