import { Router } from "express"
import { AuthenticateUserController } from "../../../presentation/controller/authenticateUser/AuthenticateUserController.js"
import { RefreshTokenController } from "../../../presentation/controller/authenticateUser/RefreshTokenController.js"
import { addUserInformationToRequest } from "../../../presentation/middleware/ensureAuthenticated/addUserInformationToRequest.js"

const authenticateRoutes = Router()

authenticateRoutes.post("/sessions", AuthenticateUserController)
authenticateRoutes.post("/refresh-token", addUserInformationToRequest, RefreshTokenController)

export { authenticateRoutes }