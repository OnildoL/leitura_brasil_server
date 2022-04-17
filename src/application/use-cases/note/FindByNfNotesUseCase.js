import { database } from "../../../main/app.js"

export async function FindByNfNotesUseCase(data_where, column = "", content = "", store = "") {
  if (column === "provider") {
    const data = await database("notes")
      .where(database.raw(`provider LIKE '%${content}%' AND store = '${store}'`))

    return data
  }

  const data = await database("notes")
    .where(data_where)

  return data
}
