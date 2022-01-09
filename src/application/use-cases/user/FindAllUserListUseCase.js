import { database } from "../../../main/app.js"

export async function FindAllUserListUseCase() {
  return await database("users")
}
