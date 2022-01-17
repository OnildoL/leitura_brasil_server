import { FindAllGoalUseCase } from "../../../application/use-cases/goal/FindAllGoalUseCase.js"

export async function GoalListController(request, response) {
  const goals = await FindAllGoalUseCase()

  return response.status(200).json(goals)
}