import { database } from "../../../main/app.js"

export async function FindByNfNotesUseCase(nf, store) {
  const data = await database("notes")
    .where({ nf, store })

  return data
}
