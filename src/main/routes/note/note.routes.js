import { Router } from "express"

import multer from "multer"
import { storage } from "../../../presentation/middleware/multer/multer.js"

const upload = multer({ storage })

import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"
import { FindByNotePerRequestIdController } from "../../../presentation/controller/note/FindByNotePerRequestIdController.js"
import { CreateNotesController } from "../../../presentation/controller/note/CreateNotesController.js"

const noteRoutes = Router()

noteRoutes.use(ensureAuthenticated)
noteRoutes.get("/:id", FindByNotePerRequestIdController)
noteRoutes.post("/", upload.single("file"), CreateNotesController)

export { noteRoutes }
