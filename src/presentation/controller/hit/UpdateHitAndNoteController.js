import { UpdateHitAndNoteUseCase } from "../../../application/use-cases/hit/UpdateHitAndNoteUseCase.js"

export async function UpdateHitAndNoteController(request, response) {
  const data = request.body
  
  await UpdateHitAndNoteUseCase(data)

  return response.status(200).send()
}
