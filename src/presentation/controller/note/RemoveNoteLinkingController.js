import { UpdateNoteUseCase } from "../../../application/use-cases/note/UpdateNoteUseCase.js"

export async function RemoveNoteLinkingController(request, response) {
  const { access_key } = request.body

  const update = { requests_inputs_id: null }

  const remove = "removeLinking"

  await UpdateNoteUseCase(access_key, update, remove)

  return response.status(200).send()
}
