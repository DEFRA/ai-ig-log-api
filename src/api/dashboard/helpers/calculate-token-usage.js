import { aggregatetoArray } from '~/src/api/helpers/db.js'
import { calculateCost } from '~/src/api/dashboard/helpers/calculate-cost.js'

const pipeline = (projectId) => {
  return [
    { $match: { projectId } },
    { $unwind: '$threads' },
    { $unwind: '$threads.steps' },
    {
      $group: {
        _id: {
          model: '$threads.steps.modelName'
        },
        totalInputTokens: { $sum: '$threads.steps.inputTokens' },
        totalOutputTokens: { $sum: '$threads.steps.outputTokens' }
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
        model: '$_id.model',
        totalInputTokens: 1,
        totalOutputTokens: 1,
        totalTokens: 1,
        cost: 1
      }
    },
    {
      $sort: { model: 1 }
    }
  ]
}

const calculateTokenUsage = async (db, projectId) => {
  const usage = await aggregatetoArray(db, 'sessions', pipeline(projectId))
  return calculateCost(usage)
}

export { calculateTokenUsage }
