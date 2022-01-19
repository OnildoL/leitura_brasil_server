import { database } from "../../../main/app.js"

export async function UpdateUserUseCase(data) {
  const { id, user } = data

  return await database("users")
    .update(user)
    .where({ id })
}
