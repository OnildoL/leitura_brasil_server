import { database } from "../../../main/app.js"

async function getRequests(id) {
  const requests = await database("requests_inputs")
    .where({ goals_id: id })
    .join("goals", "goals.id", "=", "requests_inputs.goals_id")
    .select(
      "requests_inputs.id as request_id",
      "requests_inputs.month as request_month",
      "requests_inputs.provider as request_provider",
      "requests_inputs.request_value",
      "requests_inputs.goals_id",
    )

  return requests
}

export async function FindAllGoalsAndNotesUseCase(year, store, sector) {
  const data = []
  const goals = await database("goals")
    .where({ year, store, sector })

  for (const goal of goals) {
    const requests = await getRequests(goal.id) 
    const notes = []

    for await (const note of requests) {
      const result = await database("notes")
        .where({ requests_inputs_id: note.request_id })
        .join("requests_inputs", "requests_inputs.id", "=", "notes.requests_inputs_id")
        .select(
          "notes.id as note_id",
          "notes.access_key",
          "notes.cnpj",
          "notes.value as note_value",
          "notes.nf",
          "notes.issue",
          "notes.provider as note_provider",
          "notes.requests_inputs_id",
        )
      
      for (const note of result) {
        notes.push(note)
      }
    }

    const result = {
      ...goal,
      requests: [...requests],
      notes: [...notes],
    }

    data.push(result)
  }

  return JSON.stringify(data)
}
