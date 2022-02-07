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
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  next();
});
app.use(router)
app.use(MiddlewareAppError)

export { app, database }
