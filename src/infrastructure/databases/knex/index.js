import knexfile from "../../../../knexfile.js"
import knex from "knex"

export const database = knex(knexfile["development"])

// async function main() {

// }

// main()

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