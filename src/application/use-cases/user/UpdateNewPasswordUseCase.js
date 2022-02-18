import { compare, hash } from "bcrypt"
import { database } from "../../../main/app.js"
import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js"
import { FindByIdUserUseCase } from "./FindByIdUserUseCase.js"

export async function UpdateNewPasswordUseCase(data) {
  const { password, current_password, user_id } = data
  
  const user_data = await FindByIdUserUseCase(user_id)

  const passwordMatch = await compare(current_password, user_data.password)

  if (!passwordMatch) {
    throw new AppError("Senha inválida", 405)
  }

  const passwordHash = await hash(password, 8)

  return await database("users")
    .update({ password: passwordHash, updated_at: new Date() })
    .where({ id: user_data.id })
}
