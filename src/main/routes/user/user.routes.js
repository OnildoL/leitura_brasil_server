import { Router } from "express"

import { CreateUserController } from "../../../presentation/controller/user/CreateUserController.js"
import { FindByUserController } from "../../../presentation/controller/user/FindByUserController.js"
import { FindUserToEditDataController } from "../../../presentation/controller/user/FindUserToEditDataController.js"
import { UpdateNewPasswordController } from "../../../presentation/controller/user/UpdateNewPasswordController.js"
import { UpdateUserController } from "../../../presentation/controller/user/UpdateUserController.js"
import { UserListController } from "../../../presentation/controller/user/UserListController.js"
import { ensureAuthenticated } from "../../../presentation/middleware/ensureAuthenticated/ensureAuthenticated.js"

const usersRoutes = Router()

usersRoutes.use(ensureAuthenticated)
usersRoutes.get("/user", FindByUserController)
usersRoutes.get("/edition/:user", FindUserToEditDataController)

usersRoutes.get("/", UserListController)
usersRoutes.post("/", CreateUserController)
usersRoutes.put("/:id", UpdateUserController)
usersRoutes.put("/new/password", UpdateNewPasswordController)

export { usersRoutes }