import { UpdateRequestUseCase } from "../../../application/use-cases/request/UpdateRequestUseCase.js"

export async function UpdateRequestController(request, response) {
  const data = request.body

  await UpdateRequestUseCase(data)

  return response.status(200).send()
}
