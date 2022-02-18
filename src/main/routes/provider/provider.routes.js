import { Router } from "express"

import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"
import { FindAllProvidersController } from "../../../presentation/controller/provider/FindAllProvidersController.js"

const providerRoutes = Router()

providerRoutes.use(ensureAuthenticated)
providerRoutes.get("/", FindAllProvidersController)

export { providerRoutes }