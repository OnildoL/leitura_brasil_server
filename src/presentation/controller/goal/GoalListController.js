import { FindAllGoalUseCase } from "../../../application/use-cases/goal/FindAllGoalUseCase.js"

export async function GoalListController(request, response) {
  const { store } = request.params

  const goals = await FindAllGoalUseCase(store)

  return response.status(200).json(goals)
}