import { database } from "../../../main/app.js"
import { FindByAccessKeyUseCase } from "./FindByAccessKeyUseCase.js"

export async function CreateNotesUseCase(notes) {
  for (const note of notes) {
    const note_result = await FindByAccessKeyUseCase(note.access_key)

    if (!note_result && note.hangtag === "-") {
      await database("notes").insert(note)
    }

    if (note_result && note.hangtag !== "-") {
      await database("notes")
        .update({ 
          hangtag: note.hangtag,
          updated_at: new Date()
         })
        .where({ access_key: note.access_key })
    }
  }

  return
}
