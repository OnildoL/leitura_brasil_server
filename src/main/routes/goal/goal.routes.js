import { Router } from "express"
import { ConsolidatedBySectorController } from "../../../presentation/controller/goal/ConsolidatedBySectorController.js"
import { CreateGoalController } from "../../../presentation/controller/goal/CreateGoalController.js"
import { FindAllGoalsAndNotesController } from "../../../presentation/controller/goal/FindAllGoalsAndNotesController.js"
import { GoalListController } from "../../../presentation/controller/goal/GoalListController.js"
import { YearConsolidationController } from "../../../presentation/controller/goal/YearConsolidationController.js"
import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"

const goalsRoutes = Router()

goalsRoutes.use(ensureAuthenticated)

goalsRoutes.get("/consolidation/:year/:store", YearConsolidationController)
goalsRoutes.get("/consolidated/:year/:store", ConsolidatedBySectorController)
goalsRoutes.get("/consolidated/:year/:store/:sector", FindAllGoalsAndNotesController)

goalsRoutes.get("/", GoalListController)
goalsRoutes.post("/", CreateGoalController)

export { goalsRoutes }