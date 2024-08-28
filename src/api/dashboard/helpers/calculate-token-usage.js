import { aggregatetoArray } from '~/src/api/helpers/db.js'

const pipeline = (projectId, costLookup) => {
  return [
    { $unwind: '$threads' },
    { $unwind: '$threads.steps' },
    {
      $group: {
        _id: {
          model: '$threads.steps.model_name'
        },
        totalInputTokens: { $sum: '$threads.steps.input_tokens' },
        totalOutputTokens: { $sum: '$threads.steps.output_tokens' }
      }
    },
    {
      $addFields: {
        totalTokens: { $sum: ['$totalInputTokens', '$totalOutputTokens'] },
        cost: {
          $multiply: [
            { $sum: ['$totalInputTokens', '$totalOutputTokens'] },
            {
              $switch: {
                branches: Object.keys(costLookup).map((model) => ({
                  case: { $eq: ['$_id.model', model] },
                  then: costLookup[model]
                })),
                default: 0
              }
            }
          ]
        }
      }
    },
    {
      $addFields: {
        cost: {
          $round: [{ $divide: ['$cost', 100] }, 4]
        }
      }
    },
    {
      $project: {
        _id: 0,
        model: '$_id.model',
        totalTokens: 1,
        cost: 1
      }
    }
  ]
}

const calculateTokenUsage = async (db, projectId, costLookup) => {
  return await aggregatetoArray(db, 'sessions', pipeline(projectId, costLookup))
}

export { calculateTokenUsage }
