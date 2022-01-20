import knexfile from "../../../../knexfile.js"
import knex from "knex"

export const database = knex(knexfile["development"])

;(async () => {
  const [goal] = await database("goals")
  .where({ id: 5 })


  const requests = await database("requests_inputs")
  .where({ goals_id: 5 })
  .join("goals", "goals.id", "=", "requests_inputs.goals_id")
  .select(
    "requests_inputs.id as request_id",
    "requests_inputs.provider as request_provider",
    "requests_inputs.request_value",
    "requests_inputs.goals_id",
  )

  const notes = await database("notes")
  .where({ requests_inputs_id: 4 })
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

  const result = {
    ...goal,
    requests: [...requests],
    notes: [...notes],
  }

  console.log(result)
})()