import { Router } from "express"

import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"
import { FindAllHitsController } from "../../../presentation/controller/hit/FindAllHitsController.js"
import { UpdateHitController } from "../../../presentation/controller/hit/UpdateHitController.js"
import { CreateHitController } from "../../../presentation/controller/hit/CreateHitController.js"

const hitRoutes = Router()

hitRoutes.use(ensureAuthenticated)
hitRoutes.get("/:id", FindAllHitsController)
hitRoutes.put("/", UpdateHitController)
hitRoutes.post("/", CreateHitController)

export { hitRoutes }