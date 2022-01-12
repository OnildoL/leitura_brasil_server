import express from "express"
import "express-async-errors"
import cors from "cors"
import { database } from "../infrastructure/databases/knex/index.js"
import { router } from "./routes/index.js"
import { MiddlewareAppError } from "../presentation/middleware/middlewareAppError/MiddlewareAppError.js"

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(MiddlewareAppError)

export { app, database }
