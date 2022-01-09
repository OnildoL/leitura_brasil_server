import { Router } from "express"
import { CreateUserController } from "../../../presentation/controller/user/CreateUserController.js"
import { UserListController } from "../../../presentation/controller/user/UserListController.js"

const usersRoutes = Router()

usersRoutes.get("/", UserListController)
usersRoutes.post("/", CreateUserController)

export { usersRoutes }