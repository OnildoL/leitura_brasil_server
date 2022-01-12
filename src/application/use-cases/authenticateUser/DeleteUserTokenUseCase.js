import { database } from "../../../main/app.js"

export async function DeleteUserTokenUseCase(id) {
  return await database("users_tokens")
    .delete()
    .where({ id })
}
