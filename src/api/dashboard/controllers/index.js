import Joi from 'joi'
import { calculateTokenUsageByModel } from '~/src/api/dashboard/helpers/calculate-token-usage-by-models.js'
import { calculateTokenUsage } from '~/src/api/dashboard/helpers/calculate-token-usage.js'
import { calculateThreads } from '~/src/api/dashboard/helpers/calculate-threads.js'
import { calculateThreadsByDay } from '~/src/api/dashboard/helpers/calculate-threads-by-day.js'
import { calculateTokenUsageByModelByUser } from '~/src/api/dashboard/helpers/calculate-token-usage-by-models-user.js'
import { calculateSessionsByDay } from '~/src/api/dashboard/helpers/calculate-sessions-by-day.js'

const dashboardController = {
  options: {
    validate: {
      params: Joi.object({
        projectId: Joi.string().uuid().required()
      })
    }
  },
  handler: async (request, h) => {
    const db = request.db
    const projectId = request.params.projectId

    const costLookup = {
      'chatgpt-4': 0.03,
      'chatgpt-40': 0.005,
      'gpt-3.5-turbo': 0.0005
    }

    const totalSession = await db
      .collection('sessions')
      .countDocuments({ project_id: projectId })
    const sessionsByDay = await calculateSessionsByDay(db, projectId)
    const tokenUsageByModel = await calculateTokenUsageByModel(
      db,
      projectId,
      costLookup
    )
    const tokenUsage = await calculateTokenUsage(db, projectId, costLookup)
    const totalThreads = await calculateThreads(db, projectId)
    const totalThreadsByDay = await calculateThreadsByDay(db, projectId)
    const tokenUsageByModelByUser = await calculateTokenUsageByModelByUser(
      db,
      projectId,
      costLookup
    )
    const totalCost = tokenUsage.reduce((sum, item) => sum + item.cost, 0)

    return h
      .response({
        sessionsByDay,
        totalSession,
        tokenUsage,
        tokenUsageByModel,
        totalThreads,
        totalThreadsByDay,
        tokenUsageByModelByUser,
        totalCost
      })
      .code(201)
  }
}

export { dashboardController }
