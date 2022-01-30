import { database } from "../../../main/app.js"

export async function FindByAccessKeyUseCase(access_key) {
  const [note] = await database("notes")
    .where({ access_key })

  return note
}
