import { database } from "../../../main/app.js"

export async function UpdateUserUseCase(data) {
  const { id, role, permission, activated } = data

  return await database("users")
    .update({ role, permission, activated })
    .where({ id })
}
