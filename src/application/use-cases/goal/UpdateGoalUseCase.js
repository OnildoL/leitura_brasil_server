import { database } from "../../../main/app.js"

export async function UpdateGoalUseCase(data) {
  const { goal, id } = data

  const update = {
    goal,
    updated_at: new Date()
  }

  return database("goals").update(update).where({ id })
}
