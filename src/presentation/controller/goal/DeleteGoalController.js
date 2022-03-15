import { DeleteGoalUseCase } from "../../../application/use-cases/goal/DeleteGoalUseCase.js"

export async function DeleteGoalController(request, response) {
  const { id } = request.body

  await DeleteGoalUseCase(id)

  return response.status(200).send()
}
