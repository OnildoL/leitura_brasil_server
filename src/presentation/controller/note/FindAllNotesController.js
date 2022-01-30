import { FindAllNotesUseCase } from "../../../application/use-cases/note/FindAllNotesUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"

export async function FindAllNotesController(request, response) {
  const { user_id } = request

  const { store } = await FindByIdUserUseCase(user_id)

  const notes = await FindAllNotesUseCase(store)

  return response.status(200).json(notes)
}
