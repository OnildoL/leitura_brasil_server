import { Router } from "express"

import { CreateRequestController } from "../../../presentation/controller/request/CreateRequestController.js"
import { FindAllGoalsForRequestMonthController } from "../../../presentation/controller/request/FindAllGoalsForRequestMonthController.js"
import { FindByIdController } from "../../../presentation/controller/request/FindByIdController.js"
import { UpdateRequestController } from "../../../presentation/controller/request/UpdateRequestController.js"
import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"

const requestRoutes = Router()

requestRoutes.use(ensureAuthenticated)

requestRoutes.get("/:year/:sector/:store", FindAllGoalsForRequestMonthController)
requestRoutes.get("/:id", FindByIdController)

requestRoutes.post("/", CreateRequestController)
requestRoutes.put("/", UpdateRequestController)

export { requestRoutes }