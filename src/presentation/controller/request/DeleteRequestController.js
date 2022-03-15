import { DeleteRequestUseCase } from "../../../application/use-cases/request/DeleteRequestUseCase.js"

export async function DeleteRequestController(request, response) {
  const { id } = request.body
  
  await DeleteRequestUseCase(id)

  return response.status(200).send()
}
