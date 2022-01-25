import { Router } from "express"

import { usersRoutes } from "./user/user.routes.js"
import { authenticateRoutes } from "./authenticateUser/authenticate.routes.js"
import { goalsRoutes } from "./goal/goal.routes.js"
import { requestRoutes } from "./request/request.routes.js"

const router = Router()

router.use("/users", usersRoutes)
router.use("/goals", goalsRoutes)
router.use("/requests", requestRoutes)
router.use(authenticateRoutes)

export { router }