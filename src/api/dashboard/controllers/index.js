import Joi from 'joi'
import { calculateTokenUsageByModel } from '~/src/api/dashboard/helpers/calculate-token-usage-by-models.js'
import { calculateTokenUsage } from '~/src/api/dashboard/helpers/calculate-token-usage.js'
import { calculateThreads } from '~/src/api/dashboard/helpers/calculate-threads.js'
import { calculateThreadsByDay } from '~/src/api/dashboard/helpers/calculate-threads-by-day.js'
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

    const totalSession = await db
      .collection('sessions')
      .countDocuments({ projectId })
    const sessionsByDay = await calculateSessionsByDay(db, projectId)
    const tokenUsageByModel = await calculateTokenUsageByModel(db, projectId)
    const tokenUsage = await calculateTokenUsage(db, projectId)
    const totalThreads = await calculateThreads(db, projectId)
    const totalThreadsByDay = await calculateThreadsByDay(db, projectId)
    const totalCost = tokenUsage.reduce((sum, item) => sum + item.cost, 0)
    return h
      .response({
        sessionsByDay,
        totalSession,
        tokenUsage,
        tokenUsageByModel,
        totalThreads,
        totalThreadsByDay,
        totalCost: totalCost.toFixed(3)
      })
      .code(201)
  }
}

export { dashboardController }
