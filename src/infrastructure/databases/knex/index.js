import knexfile from "../../../../knexfile.js"
import knex from "knex"

export const database = knex(knexfile["development"])
