import { database } from "../../../main/app.js"

export async function FindByGoalUseCase(data) {
  const { sector, month, year, store } = data
  
  const [goal] = await database("goals")
    .where({ sector, month, year, store })

  return goal
}
