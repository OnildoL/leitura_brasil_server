import express from "express"
import { database } from "../infrastructure/databases/knex/index.js"
import cors from "cors"
import { router } from "./routes/index.js"

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(router)

export { app, database }
