import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  development: {
    client: 'pg',
    connection: {
      user : "postgres",
      password : "postgres",
      database : "leitura_brasil"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/infrastructure/databases/knex/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/infrastructure/databases/knex/seeds`
    }
  }
};
