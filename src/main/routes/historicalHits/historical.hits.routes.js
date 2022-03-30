import { Router } from "express"
import multer from "multer"
import { storage } from "../../../presentation/middleware/multer/multer.js"

const upload = multer({ storage })

import { RegisterHistoricalController } from "../../../presentation/controller/historicalHits/RegisterHistoricalController.js"

const historicalHits = Router()

historicalHits.post("/", upload.single("file"), RegisterHistoricalController)

export { historicalHits }