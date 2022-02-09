import { database } from "../../../main/app.js"

async function getGoalsPerSector(year, store, sector) {
  const data = await database("goals")
    .where({
      year,
      store,
      sector
    })
  
  return data
}
async function getGoals(year, store) {
  const data = await database("goals")
    .where({
      year,
      store
    })
  
  return data
}
async function getRequests(id) {
  const data = await database("requests_inputs")
      .where({ goals_id: id })
      .join("goals", "goals.id", "=", "requests_inputs.goals_id")
      .select(
        "requests_inputs.id as request_id",
        "requests_inputs.provider as request_provider",
        "requests_inputs.request_value",
        "requests_inputs.goals_id",
      )

  return data
}
async function getNotes(id) {
  const data = await database("notes")
    .where({ requests_inputs_id: id })
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

  return data
}

export async function filtersConsolidatedBySector(data, sector) {
  const totalSector = []
  
  for (const goal_month of data) {
    const { goal, id } = goal_month

    const { request } = goal_month.requests.reduce((accumulator, { request_value }) => {
      accumulator.request = accumulator.request + Number(request_value) || Number(request_value)
      return accumulator
    }, {})

    const { note } = goal_month.notes.reduce((accumulator, { note_value }) => {
      accumulator.note = accumulator.note + Number(note_value) || Number(note_value)
      return accumulator
    }, {})

    totalSector.push({
      id,
      goal,
      sector: sector,
      month: goal_month.month,
      request: request ?? 0,
      input: note ?? 0
    })
  }

  const { goal, request, input } = totalSector.reduce((accumulator, { goal, request, input }) => {
    accumulator.goal = accumulator.goal + Number(goal) || Number(goal)
    accumulator.request = accumulator.request + request || request
    accumulator.input = accumulator.input + input || input

    return accumulator
  }, {})
  
  const consolidation = { goal, request, input, totalSector }

  return JSON.stringify(consolidation)
}

export async function ConsolidateBySectorUseCase(year, store, sector) {
  const consolidatedBySectors = []

  const goals = await getGoalsPerSector(year, store, sector)

  for await (const goal of goals) {
    const requests = await getRequests(goal.id)

    const notes = []

    for await (const request of requests) {
      const result = await getNotes(request.request_id)

      if (result) {
        for (const note of result) {
          notes.push(note)
        }
      }
    }

    const result = {
      ...goal,
      requests: [...requests],
      notes: [...notes],
    }

    consolidatedBySectors.push(result)
  }

  return JSON.stringify(consolidatedBySectors)
}
export async function ConsolidatedBySectorUseCase(year, store) {
  const consolidatedBySectors = []

  const goals = await getGoals(year, store)

  for await (const goal of goals) {
    const requests = await getRequests(goal.id)

    const notes = []

    for await (const request of requests) {
      const result = await getNotes(request.request_id)

      if (result) {
        for (const note of result) {
          notes.push(note)
        }
      }
    }

    const result = {
      ...goal,
      requests: [...requests],
      notes: [...notes],
    }

    consolidatedBySectors.push(result)
  }

  return JSON.stringify(consolidatedBySectors)
}
