import { Router } from "express"

import { CreateRequestController } from "../../../presentation/controller/request/CreateRequestController.js"
import { FindAllGoalsForRequestMonthController } from "../../../presentation/controller/request/FindAllGoalsForRequestMonthController.js"
import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"

const requestRoutes = Router()

requestRoutes.use(ensureAuthenticated)

requestRoutes.get("/:year/:sector/:store", FindAllGoalsForRequestMonthController)
requestRoutes.post("/", CreateRequestController)

export { requestRoutes }