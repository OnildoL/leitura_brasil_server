import { database } from "../../../main/app.js"

export async function FindByNotePerRequestIdUseCase(id) {
  const data = await database("notes")
    .where({ requests_inputs_id: id })

  return data
}
