import { Router } from "express"

import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"
import { FindAllProvidersController, FindAllProvidersIdController } from "../../../presentation/controller/provider/FindAllProvidersController.js"
import { CreateProviderController, CreateProviderInfoController } from "../../../presentation/controller/provider/CreateProviderController.js"
import { EditionProviderController } from "../../../presentation/controller/provider/EditionProviderController.js"

const providerRoutes = Router()

providerRoutes.use(ensureAuthenticated)
providerRoutes.get("/:activated", FindAllProvidersController)
providerRoutes.get("/names/ids", FindAllProvidersIdController)

providerRoutes.post("/", CreateProviderController)
providerRoutes.post("/info", CreateProviderInfoController)
providerRoutes.put("/", EditionProviderController)

export { providerRoutes }