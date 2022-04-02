import { FindAllNotesUseCase } from "../../../application/use-cases/note/FindAllNotesUseCase.js"
import { FindByNfNotesUseCase } from "../../../application/use-cases/note/FindByNfNotesUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"

export async function FindAllNotesController(request, response) {
  const { content } = request.query
  const { user_id } = request
  const { store } = await FindByIdUserUseCase(user_id)

  if (content) {
    const notes = await FindByNfNotesUseCase(content, store)

    return response.status(200).json({ notes })
  }

  const { page = 1 } = request.query
  const { notes, count } = await FindAllNotesUseCase(page, store)

  return response.status(200).json({ notes, ...count })
}
