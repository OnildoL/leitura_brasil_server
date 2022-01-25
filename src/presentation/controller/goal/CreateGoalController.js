import { CreateGoalUseCase } from "../../../application/use-cases/goal/CreateGoalUseCase.js"

export async function CreateGoalController(request, response) {
  const { goal, sector, month, year, store } = request.body
  
  const goalData = { goal, sector, month, year, store }
  
  await CreateGoalUseCase(goalData)

  return response.status(201).send()
}
