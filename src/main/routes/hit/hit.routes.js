import { Router } from "express"

import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"
import { FindAllHitsController } from "../../../presentation/controller/hit/FindAllHitsController.js"

const hitRoutes = Router()

hitRoutes.use(ensureAuthenticated)
hitRoutes.get("/:id", FindAllHitsController)

export { hitRoutes }