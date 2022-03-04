import { CreateHitUseCase } from "../../../application/use-cases/hit/CreateHitUseCase.js"

export async function CreateHitController(request, response) {
  const data = request.body

  await CreateHitUseCase(data)

  return response.status(200).send()
}
