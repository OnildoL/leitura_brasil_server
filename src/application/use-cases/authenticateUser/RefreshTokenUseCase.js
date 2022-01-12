import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js"
import { CreateUserTokensUseCase } from "./CreateUserTokensUseCase.js"
import { FindByUserIdAndRefreshTokenUseCase } from "./FindByUserIdAndRefreshTokenUseCase.js"
import { DeleteUserTokenUseCase } from "./DeleteUserTokenUseCase.js"
import { FindByIdUserUseCase } from "../user/FindByIdUserUseCase.js"
import auth from "../../../main/config/auth.js"

import { randomUUID } from "crypto"
import jwt from "jsonwebtoken"
const { sign, decode } = jwt

function addDays(days) {
  let data = new Date()

  data.setDate(data.getDate() + days)

  return data
}

export async function RefreshTokenUseCase(token, user_id) {
  const userToken = await FindByUserIdAndRefreshTokenUseCase(Number(user_id), token)
  const { user, name, role, activated, store } = await FindByIdUserUseCase(Number(user_id))

  if (!userToken) {
    throw new AppError("Refresh_token não existe!", 401)
  }

  await DeleteUserTokenUseCase(userToken.id)

  const refresh_token = randomUUID()

  const refresh_token_expires_date = addDays(auth.expires_refresh_token_days)

  const newToken = sign({ user, name, role, activated, store }, auth.secret_token, {
    subject: `${userToken.user_id}`,
    expiresIn: auth.expires_in_token
  })
  
  await CreateUserTokensUseCase({
    user_id: `${userToken.user_id}`,
    expires_date: refresh_token_expires_date,
    refresh_token,
    })

  return { user: { user, name, role, activated, store }, token: newToken, refresh_token }
}
