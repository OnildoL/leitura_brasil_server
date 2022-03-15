import { Router } from "express"

import { CreateRequestController } from "../../../presentation/controller/request/CreateRequestController.js"
import { FindAllGoalsForRequestMonthController } from "../../../presentation/controller/request/FindAllGoalsForRequestMonthController.js"
import { FindByIdController } from "../../../presentation/controller/request/FindByIdController.js"
import { UpdateRequestController } from "../../../presentation/controller/request/UpdateRequestController.js"
import { LinkNoteController } from "../../../presentation/controller/note/LinkNoteController.js"
import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"
import { RemoveNoteLinkingController } from "../../../presentation/controller/note/RemoveNoteLinkingController.js"
import { DeleteRequestController } from "../../../presentation/controller/request/DeleteRequestController.js"

const requestRoutes = Router()

requestRoutes.use(ensureAuthenticated)

requestRoutes.get("/:year/:sector/:store", FindAllGoalsForRequestMonthController)
requestRoutes.get("/:id", FindByIdController)

requestRoutes.post("/", CreateRequestController)
requestRoutes.put("/", UpdateRequestController)
requestRoutes.put("/link", LinkNoteController)
requestRoutes.put("/remove/note", RemoveNoteLinkingController)
requestRoutes.put("/remove/request", DeleteRequestController)

export { requestRoutes }