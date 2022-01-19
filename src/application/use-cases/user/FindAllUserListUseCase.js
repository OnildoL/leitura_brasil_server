import { database } from "../../../main/app.js"

export async function FindAllUserListUseCase(permission, store) {
  if (permission) {
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
