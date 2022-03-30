import { UpdateOneNoteUseCase } from "../../../application/use-cases/note/UpdateOneNoteUseCase.js"

/**
 * Por enquanto apenas atualização da data de entrada
 */

export async function UpdateOneNoteController(request, response) {
  const { access_key, input } = request.body

  const update = { input, updated_at: new Date() }

  await UpdateOneNoteUseCase(access_key, update)

  return response.status(200).send()
}
