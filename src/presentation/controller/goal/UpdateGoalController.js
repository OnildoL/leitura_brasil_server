import { UpdateGoalUseCase } from "../../../application/use-cases/goal/UpdateGoalUseCase.js"

export async function UpdateGoalController(request, response) {
  const { goal, id } = request.body

  const update = { goal, id }

  await UpdateGoalUseCase(update)

  return response.status(200).send()
}