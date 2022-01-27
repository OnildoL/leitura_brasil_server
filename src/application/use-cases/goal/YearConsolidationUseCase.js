import { randomUUID } from "crypto"
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
async function consolidate(year, store) {
  const consolidated = []
  const months = ["FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ", "JAN"]
  const goals = await database("goals")
    .where({ year, store })
  
  for (const month of months) {
    const goalsOftheMonth  = goals.filter(goal => goal.month === month)

    for (const goal of goalsOftheMonth) {
      const totalNotes = []
      const requests = await getRequests(goal.id)

      for (const request of requests) {
        const note = await getNotes(request.request_id)

        for (const nf of note) {
          totalNotes.push(nf)
        }
      }

      consolidated.push({
        ...goal,
        requests: [...requests],
        notes: totalNotes
      })
    }
  }

  return JSON.stringify(consolidated)
}
async function totalConsolidationAmountsFortheYear(year, store) {
  const goals = await database("goals")
    .where({ year, store })

  const requests = await database("requests_inputs")
    .where({ year, store })

  const inputs = await database("notes")
    .where({ year, store })
  
  const { goal } = goals.reduce((accumulator, { goal }) => {
    accumulator.goal = accumulator.goal + Number(goal) || Number(goal)
      
    return accumulator
  }, {})

  const { request } = requests.reduce((accumulator, { request_value }) => {
    accumulator.request = accumulator.request + Number(request_value) || Number(request_value)
      
    return accumulator
  }, {})

  const { input } = inputs.reduce((accumulator, { value }) => {
    accumulator.input = accumulator.input + Number(value) || Number(value)
      
    return accumulator
  }, {})

  const consolidated_year = {
    goal: goal || 0,
    request: request || 0,
    input: input || 0
  }

  return consolidated_year
}
export async function YearConsolidationUseCase(year, store) {
  const consolidated = []
  const months = ["FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ", "JAN"]
  const consolidation = await consolidate(year, store)

  for (const month of months) {
    const requestAndNote = []
    const goalsOrdersAndNotesOfTheMonth = JSON.parse(consolidation).filter(monthData => monthData.month === month) 
    
    const goal = goalsOrdersAndNotesOfTheMonth.reduce((accumulator, { goal }) => {
      accumulator.goal = accumulator.goal + Number(goal) || Number(goal)
        
      return accumulator
    }, {})
    
    for (const goalRequestNoteMonth of goalsOrdersAndNotesOfTheMonth) {
      const { note } = goalRequestNoteMonth.notes.reduce((accumulator, { note_value }) => {
        accumulator.note = accumulator.note + Number(note_value) || Number(note_value)
          
        return accumulator
      }, {})

      const { request } = goalRequestNoteMonth.requests.reduce((accumulator, { request_value }) => {
        accumulator.request = accumulator.request + Number(request_value) || Number(request_value)
          
        return accumulator
      }, {})
  
      requestAndNote.push({
        month: goalRequestNoteMonth.month,
        request: request || 0,
        note: note || 0
      })
    }
    
    const { request } = requestAndNote.reduce((accumulator, { request }) => {
      accumulator.request = accumulator.request + request || request
        
      return accumulator
    }, {})

    const { note } = requestAndNote.reduce((accumulator, { note }) => {
      accumulator.note = accumulator.note + note || note
        
      return accumulator
    }, {})

    consolidated.push({ id: randomUUID(), month, ...goal, request, note })
  }

  const totals = await totalConsolidationAmountsFortheYear(year, store)
  
  return { consolidated, totals }
}
