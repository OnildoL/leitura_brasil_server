import { FindByNfNotesUseCase } from "../../../application/use-cases/note/FindByNfNotesUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"

export async function FindByNfNotesController(request, response) {
  const { note } = request.query

  const { user_id } = request

  const { store } = await FindByIdUserUseCase(user_id)

  const notes = note.includes(";") ? note.split(";") : [note]

  const nfs = []

  for await (const note of notes) {
    const result = await FindByNfNotesUseCase(note, store)

    for (const nf of result) {
      nfs.push(nf)
    }
  }

  return response.status(200).json(nfs)
}
