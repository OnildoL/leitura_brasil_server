import { FindAllGoalsPerStoreUseCase } from "../../../application/use-cases/goal/FindAllGoalUseCase.js"

export async function FindAllGoalsForRequestMonthController(request, response) {
  const { year, sector, store } = request.params

  const data = { year, sector, store }

  const goals = await FindAllGoalsPerStoreUseCase(data)

  return response.status(200).json(goals)
}
