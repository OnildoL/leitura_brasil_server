import { Router } from "express"
import { usersRoutes } from "./user/userList.routes.js"

const router = Router()

router.use("/users", usersRoutes)

export { router }