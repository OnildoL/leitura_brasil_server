import knexfile from "../../../../knexfile.js"
import knex from "knex"

export const database = knex(knexfile["development"])

// async function main() {
//   const consolidated = await consolidate()
//   const sectors = ["papelaria"] //, "hq", "papelaria", "presentes", "informatica", "volta as aulas"

//   for (const sector of sectors) {
//     const result = JSON.parse(consolidated)
//       .filter(data => data.sector === sector)
//       // .reduce((accumulator, { goal }) => {
//       //   accumulator.goal = accumulator.goal + Number(goal) || Number(goal)
//       // })

//     console.log(result)
//     break
//   }
// }

// main()

/**
 * 
 * Consulta por id da meta, dados retornados são pedidos e notas
 * Vai servir para quando clicar no botão correspondente ao setor
 * 
 */

//  const [goal] = await database("goals")
//  .where({ id: 6 })

//  const requests = await database("requests_inputs")
//  .where({ goals_id: goal.id })
//  .join("goals", "goals.id", "=", "requests_inputs.goals_id")
//  .select(
//    "requests_inputs.id as request_id",
//    "requests_inputs.provider as request_provider",
//    "requests_inputs.request_value",
//    "requests_inputs.goals_id",
//  )

//  const notes = []

//  for await (const note of requests) {
//    const [result] = await database("notes")
//    .where({ requests_inputs_id: note.request_id })
//    .join("requests_inputs", "requests_inputs.id", "=", "notes.requests_inputs_id")
//    .select(
//      "notes.id as note_id",
//      "notes.access_key",
//      "notes.cnpj",
//      "notes.value as note_value",
//      "notes.nf",
//      "notes.issue",
//      "notes.provider as note_provider",
//      "notes.requests_inputs_id",
//    )
//    if (result) notes.push(result)
//  }

//  const result = {
//    ...goal,
//    requests: [...requests],
//    notes: [...notes],
//  }

//  console.log(result)



/**
 * 
 * Script para o consolidado de cada ano
 * Vai servir para o painel do consolidado do ano de cada setor independente do botão do setor que for clicado, o consolidado vai ser o mesmo.
 */

//  const goals = await database("goals")
//  .where({ year: "2022" })

// const requests = await database("requests_inputs")
//  .where({ year: "2022" })

// const inputs = await database("notes")
//  .where({ year: "2022" })

// const goal = goals.reduce((accumulator, { goal }) => {
//  accumulator.goal = accumulator.goal + Number(goal) || Number(goal)
  
//  return accumulator
// }, {})

// const request = requests.reduce((accumulator, { request_value }) => {
//  accumulator.request = accumulator.request + Number(request_value) || Number(request_value)
  
//  return accumulator
// }, {})

// const input = inputs.reduce((accumulator, { value }) => {
//  accumulator.input = accumulator.input + Number(value) || Number(value)
  
//  return accumulator
// }, {})

// const consolidated_year = {
//  ...goal,
//  ...request,
//  ...input
// }

// console.log(consolidated_year)