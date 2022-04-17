import { FindAllNotesUseCase } from "../../../application/use-cases/note/FindAllNotesUseCase.js"
import { FindByNfNotesUseCase } from "../../../application/use-cases/note/FindByNfNotesUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"

export async function FindAllNotesController(request, response) {
  const { content, column } = request.query
  const { user_id } = request
  const { store } = await FindByIdUserUseCase(user_id)

  if (column && content) {
    const field = tag => ({
      "nf": { nf: content, store },
      "provider": { provider: content, store },
      "arrival": { arrival: content, store },
      "input": { input: content, store },
      "hangtag": { hangtag: content, store },
      "receive": { receive: content, store },
    })[tag]

    const where = field(column)

    const notes = await FindByNfNotesUseCase(where, column, content, store)

    return response.status(200).json({ notes })
  }

  const { page = 1 } = request.query
  const { notes, count } = await FindAllNotesUseCase(page, store)

  return response.status(200).json({ notes, ...count })
}
