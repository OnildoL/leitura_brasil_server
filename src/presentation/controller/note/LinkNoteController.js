import { UpdateNoteUseCase } from "../../../application/use-cases/note/UpdateNoteUseCase.js"

export async function LinkNoteController(request, response) {
  const { access_key, requests_inputs_id } = request.body

  const linkUpdate = {
    requests_inputs_id,
    updated_at: new Date()
  }

  await UpdateNoteUseCase(access_key, linkUpdate)

  return response.status(200).send()
}
