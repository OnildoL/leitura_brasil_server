import { AppError } from "../middlewareAppError/AppError.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"
import auth from "../../../main/config/auth.js"

import jwt from "jsonwebtoken"
const { verify } = jwt

export async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("Token inválido!", 401)
  }

  const [, token] = authHeader?.split(" ")
  try {
    const { user: userNumber, sub: user_id } = verify(token, auth.secret_token)
    const user = await FindByIdUserUseCase(Number(user_id))
    
    if (!user) {
      throw new AppError("Usuário não existe!", 401)
    }
    
    request.user = userNumber
    request.user_id = user_id
    
    return next()
  } catch {
    throw new AppError("Token inválido!", 401)
  }
}
