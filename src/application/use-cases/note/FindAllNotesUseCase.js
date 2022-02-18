import { database } from "../../../main/app.js"

export async function FindAllNotesUseCase(page, store) {
  const notes = await database("notes")
    .orderBy("issue", "DESC")
    .limit(15)
    .offset((page - 1) * 15)
    .where({ store })

  const [count] = await database("notes")
    .count()
    .where({ store })

  return { notes, count }
}
