import { Router } from "express"
import { usersRoutes } from "./user/userList.routes.js"
import { authenticateRoutes } from "./authenticateUser/authenticate.routes.js"

const router = Router()

router.use("/users", usersRoutes)
router.use(authenticateRoutes)

export { router }