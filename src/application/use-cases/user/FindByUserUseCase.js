import { database } from "../../../main/app.js"

export async function FindByUserUseCase(user) {
  const [data] = await database("users")
    .where({ user })
  
  return data
}
