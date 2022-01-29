import { existsSync, mkdirSync } from "fs"
import { diskStorage } from "multer"

const storage = diskStorage({
  destination: function (request, file, callback) {
    const dir = "./uploads"
    if (!existsSync(dir)) {
      mkdirSync(dir)
    }
    callback(null, dir)
  },
  filename: function (request, file, callback) {
    callback(null, file.originalname)
  }
})

export { storage }