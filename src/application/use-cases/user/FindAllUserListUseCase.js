import { database } from "../../../main/app.js"

export async function FindAllUserListUseCase(role, store) {
  if (role === "developer" || role === "manager") {
    return await database("users")
    .select(
      "id",
      "user",
      "name",
      "activated",
      "store",
      "created_at",
      "updated_at",
    )
  }

  return await database("users")
    .select(
      "id",
      "user",
      "name",
      "activated",
      "store",
      "created_at",
      "updated_at",
    )
    .where({ store })
}
