import { FindByIdUseCase } from "../../../application/use-cases/request/FindByIdUseCase.js"

export async function FindByIdController(request, response) {
  const { id } = request.params

  const result = await FindByIdUseCase(Number(id))

  return response.status(200).json(result)
}
