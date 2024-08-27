import { aggregatetoArray } from '~/src/api/helpers/db.js'

function pipeline(projectId, costLookup) {
  return [
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
        day: '$_id.day',
        model: '$_id.model',
        totalTokens: 1,
        cost: 1
      }
    },
    {
      $sort: { day: 1, model: 1 }
    }
  ]
}

async function calculateTokenUsageByModel(db, projectId, costLookup) {
  return await aggregatetoArray(db, 'sessions', pipeline(projectId, costLookup))
}

export { calculateTokenUsageByModel }
