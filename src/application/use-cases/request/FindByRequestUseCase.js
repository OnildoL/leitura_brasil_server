import { database } from "../../../main/app.js"

export async function FindByRequestUseCase(data) {
  const { month, year, request_value, store } = data
  
  const [request] = await database("requests_inputs")
    .where({ month, year, request_value, store })

  return request
}
