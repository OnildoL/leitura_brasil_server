import { Router } from "express"
import { AuthenticateUserController } from "../../../presentation/controller/authenticateUser/AuthenticateUserController.js"

const authenticateRoutes = Router()

authenticateRoutes.post("/sessions", AuthenticateUserController)

export { authenticateRoutes }