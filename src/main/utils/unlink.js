import { unlink } from "fs"
import { AppError } from "../../presentation/middleware/middlewareAppError/AppError.js"

export function unLink(file_name) {
  unlink(`uploads/${file_name}`, (error) => {
    if (error) throw new AppError(`Error ao tentar deletar arquivo! - ${error}`, 405)
  })
}