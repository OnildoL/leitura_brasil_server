import { database } from "../../../main/app.js"

export async function UpdateRequestUseCase(data) {
  const { provider, goals_id, month, id, request_value } = data

  const update = {
    provider,
    goals_id,
    month,
    request_value,
    updated_at: new Date()
  }

  return await database("requests_inputs")
    .update(update)
    .where({ id })
}
