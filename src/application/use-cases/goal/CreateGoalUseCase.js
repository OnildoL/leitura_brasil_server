import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js"
import { database } from "../../../main/app.js"
import { FindByGoalUseCase } from "./FindByGoalUseCase.js"

export async function CreateGoalUseCase(data) {
  const { goal, sector, month, year, store } = data
  const goalExists = await FindByGoalUseCase(data)
  
  if (goalExists) {
    throw new AppError("Já existe meta cadastrada!", 405)
  }

  const dataGoal = {
    goal,
    sector,
    month,
    year,
    store,
    created_at: new Date(),
    updated_at: new Date()
  }

  return await database("goals").insert(dataGoal)
}