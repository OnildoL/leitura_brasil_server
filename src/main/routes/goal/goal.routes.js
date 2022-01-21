import { Router } from "express"
import { ConsolidatedBySectorController } from "../../../presentation/controller/goal/ConsolidatedBySectorController.js"
import { CreateGoalController } from "../../../presentation/controller/goal/CreateGoalController.js"
import { GoalListController } from "../../../presentation/controller/goal/GoalListController.js"
import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"

const goalsRoutes = Router()

goalsRoutes.use(ensureAuthenticated)
goalsRoutes.get("/consolidated/:year", ConsolidatedBySectorController)

goalsRoutes.get("/", GoalListController)
goalsRoutes.post("/", CreateGoalController)

export { goalsRoutes }