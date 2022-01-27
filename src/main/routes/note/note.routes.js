import { Router } from "express"

import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"
import { FindByNotePerRequestIdController } from "../../../presentation/controller/note/FindByNotePerRequestIdController.js"

const noteRoutes = Router()

noteRoutes.use(ensureAuthenticated)
noteRoutes.get("/:id", FindByNotePerRequestIdController)

export { noteRoutes }
