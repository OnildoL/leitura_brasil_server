import { Router } from "express"

import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"
import { FindAllHitsController } from "../../../presentation/controller/hit/FindAllHitsController.js"
import { UpdateHitController } from "../../../presentation/controller/hit/UpdateHitController.js"
import { CreateHitController } from "../../../presentation/controller/hit/CreateHitController.js"
import { FindHitPerProviderIdController } from "../../../presentation/controller/hit/FindHitPerProviderIdController.js"
import { UpdateHitAndNoteController } from "../../../presentation/controller/hit/UpdateHitAndNoteController.js"
import { ConsolidationHitsController } from "../../../presentation/controller/hit/ConsolidationHitsController.js"
import { FindAllHitsYearMonthController } from "../../../presentation/controller/hit/FindAllHitsYearMonthController.js"

const hitRoutes = Router()

hitRoutes.use(ensureAuthenticated)
hitRoutes.get("/consolidation/hits", ConsolidationHitsController)
hitRoutes.get("/", FindHitPerProviderIdController)
hitRoutes.get("/consolidation/year/month", FindAllHitsYearMonthController)
hitRoutes.get("/:id", FindAllHitsController)
hitRoutes.put("/update", UpdateHitAndNoteController)
hitRoutes.put("/", UpdateHitController)
hitRoutes.post("/", CreateHitController)

export { hitRoutes }