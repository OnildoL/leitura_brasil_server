import { database } from "../../../main/app.js"

export async function FindAllRequestsUseCase() {
  return await database("requests_inputs")
}
