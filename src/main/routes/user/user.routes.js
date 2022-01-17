import { Router } from "express"

import { CreateUserController } from "../../../presentation/controller/user/CreateUserController.js"
import { FindByUserController } from "../../../presentation/controller/user/FindByUserController.js"
import { UpdateUserController } from "../../../presentation/controller/user/UpdateUserController.js"
import { UserListController } from "../../../presentation/controller/user/UserListController.js"
import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"

const usersRoutes = Router()

usersRoutes.use(ensureAuthenticated)
usersRoutes.get("/", UserListController)
usersRoutes.get("/user", FindByUserController)
usersRoutes.post("/", CreateUserController)
usersRoutes.put("/:id", UpdateUserController)

export { usersRoutes }