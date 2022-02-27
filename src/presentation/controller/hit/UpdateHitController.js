import { UpdateHitUseCase } from "../../../application/use-cases/hit/UpdateHitUseCase.js"

export async function UpdateHitController(request, response) {
  const data = request.body

  await UpdateHitUseCase(data)

  return response.status(200).send()
}
