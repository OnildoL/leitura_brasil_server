import { UpdateOneNoteUseCase } from "../../../application/use-cases/note/UpdateOneNoteUseCase.js"

/**
 * Por enquanto apenas atualização da data de entrada
 */

export async function UpdateOneNoteController(request, response) {
  const { access_key, input, arrival, receive, hangtag, comment } = request.body
  const update = { input, arrival, receive, hangtag, comment, updated_at: new Date() }

  await UpdateOneNoteUseCase(access_key, update)

  return response.status(200).send()
}
