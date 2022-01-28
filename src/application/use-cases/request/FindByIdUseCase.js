import { database } from "../../../main/app.js"

export async function FindByIdUseCase(id) {
  const request = await database("requests_inputs")
    .where({ id })

  return request
}
