import { AppError } from "./AppError.js"

export function MiddlewareAppError(error, request, response, next) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  return response.status(500).json({ status: "error", message: `Internal server error - ${error.message}`})
}
