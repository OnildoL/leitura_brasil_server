import { FindByUserUseCase } from "../user/FindByUserUseCase.js"
import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js"
import { CreateUserTokensUseCase } from "./CreateUserTokensUseCase.js"
import auth from "../../../main/config/auth.js"

import { randomUUID } from "crypto"
import { compare } from "bcrypt"

import jwt from "jsonwebtoken"
const { sign } = jwt

function addDays(days) {
  let data = new Date()

  data.setDate(data.getDate() + days)

  return data
}

export async function AuthenticateUserUseCase({ userNumber, userPassword }) {
  const userData = await FindByUserUseCase(userNumber)
  
  const { 
    expires_in_token, 
    secret_token, 
    expires_refresh_token_days
  } = auth
  
  if (!userData?.id) {
    throw new AppError("Usuário ou senha incorreto!", 401)
  }

  if (!userData?.activated) {
    throw new AppError("Usuário desativado!", 401)
  }

  const passwordMatch = await compare(userPassword, userData.password)

  if (!passwordMatch) {
    throw new AppError("Usuário ou senha incorreto!", 401)
  }

  const token = sign({ user: userData.user, name: userData.name, role: userData.role, activated: userData.activated, store: userData.store }, secret_token, {
    subject: `${userData.id}`,
    expiresIn: expires_in_token
  })

  const refresh_token = randomUUID()

  const refresh_token_expires_date = addDays(expires_refresh_token_days)

  await CreateUserTokensUseCase({
    user_id: userData.id,
    expires_date: refresh_token_expires_date,
    refresh_token,
   })

  const data = { id: userData.id, user: userData.user, name: userData.name, role: userData.role, permission: userData.permission, activated: userData.activated, store: userData.store }

  return { user: data, token, refresh_token }
}