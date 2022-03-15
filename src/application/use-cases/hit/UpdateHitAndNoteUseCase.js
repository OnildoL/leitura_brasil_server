import { database } from "../../../main/app.js"

export async function UpdateHitAndNoteUseCase(data) {
  const { id, current_hit, last_hit, sales_report, value_nerus, notes } = data

  await database("hits")
    .update({ current_hit, last_hit, sales_report, value_nerus })
    .where({ id })

  if (notes) {
    for (const note of notes) {
      await database("notes")
        .update({ hits_id: id })
        .where({ id: note.id })
    }
  }

  return
}
