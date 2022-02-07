import { UpdateNoteUseCase } from "../../../application/use-cases/note/UpdateNoteUseCase.js"

export async function RemoveNoteLinkingController(request, response) {
  const { access_key } = request.body

  const update = { requests_inputs_id: null }

  await UpdateNoteUseCase(access_key, update)

  return response.status(200).send()
}
