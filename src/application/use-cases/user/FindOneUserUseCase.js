import { database } from "../../../main/app.js"

export async function FindOneUserUseCase(user) {
  const [data] = await database("users")
    .where({ user })

  return data
}
