import { database } from "../../../main/app.js"

export async function FindAllUserListUseCase() {
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
