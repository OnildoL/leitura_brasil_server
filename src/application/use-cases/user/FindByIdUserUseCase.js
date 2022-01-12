import { database } from "../../../main/app.js"

export async function FindByIdUserUseCase(id) {
  const [data] = await database("users")
    .where({ id })

  return data
}
