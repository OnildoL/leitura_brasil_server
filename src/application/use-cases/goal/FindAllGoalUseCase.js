import { database } from "../../../main/app.js"

export async function FindAllGoalUseCase(store) {
  return await database("goals")
    .where({ store })
}

export async function FindAllGoalsPerStoreUseCase(data) {
  const { year, sector, store } = data
  
  const goals = await database("goals")
    .where({ year, sector, store })

  return goals
}
