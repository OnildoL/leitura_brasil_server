import { Router } from "express"
import { ConsolidateBySectorController } from "../../../presentation/controller/goal/ConsolidateBySectorController.js"
import { ConsolidatedBySectorController } from "../../../presentation/controller/goal/ConsolidatedBySectorController.js"
import { CreateGoalController } from "../../../presentation/controller/goal/CreateGoalController.js"
import { FindAllGoalsAndNotesController } from "../../../presentation/controller/goal/FindAllGoalsAndNotesController.js"
import { GoalListController } from "../../../presentation/controller/goal/GoalListController.js"
import { UpdateGoalController } from "../../../presentation/controller/goal/UpdateGoalController.js"
import { YearConsolidationController } from "../../../presentation/controller/goal/YearConsolidationController.js"
import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"

const goalsRoutes = Router()

goalsRoutes.use(ensureAuthenticated)

goalsRoutes.get("/consolidation/:year/:store", YearConsolidationController)
goalsRoutes.get("/consolidate/:year/:store/:sector", ConsolidateBySectorController)
goalsRoutes.get("/consolidated/:year/:store", ConsolidatedBySectorController)
goalsRoutes.get("/consolidated/:year/:store/:sector", FindAllGoalsAndNotesController)

goalsRoutes.get("/:store", GoalListController)
goalsRoutes.post("/", CreateGoalController)
goalsRoutes.put("/", UpdateGoalController)

export { goalsRoutes }