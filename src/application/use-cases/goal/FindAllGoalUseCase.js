import { database } from "../../../main/app.js"

export async function FindAllGoalUseCase() {
  return await database("goals")
}
