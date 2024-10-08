import { aggregatetoArray } from '~/src/api/helpers/db.js'

const pipeline = (projectId, costLookup) => {
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
          model: '$threads.steps.model_name',
          user: '$user'
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
      $project: {
        _id: 0,
        user: '$_id.user',
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

const calculateTokenUsageByModelByUser = async (db, projectId, costLookup) => {
  return await aggregatetoArray(db, 'sessions', pipeline(projectId, costLookup))
}

export { calculateTokenUsageByModelByUser }
