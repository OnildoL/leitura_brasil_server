import { CreateRequestUseCase } from "../../../application/use-cases/request/CreateRequestUseCase.js"

export async function CreateRequestController(request, response) {
  const { provider, month, year, request_value, store, goals_id } = request.body
  
  const requestData = { provider, month, year, request_value, store, goals_id }

  await CreateRequestUseCase(requestData)

  return response.status(201).send()
}
