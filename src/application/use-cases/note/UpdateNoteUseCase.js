import { database } from "../../../main/app.js";

export async function UpdateNoteUseCase(access_key, update) {
  return await database("notes")
    .update(update)
    .where({ access_key })
}
