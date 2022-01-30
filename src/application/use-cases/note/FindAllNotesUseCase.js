import { database } from "../../../main/app.js"

export async function FindAllNotesUseCase(store) {
  const notes = await database("notes")
    .orderBy("issue", "DESC")
    .where({ store })

  return notes
}
