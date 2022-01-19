import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js"
import { FindByUserUseCase } from "./FindByUserUseCase.js"
import { database } from "../../../main/app.js"
import { hash } from "bcrypt"

export async function CreateUserUseCase(data) {
  const { user, password, name, role, store } = data
  const userExists = await FindByUserUseCase(user)

  if (userExists) {
    throw new AppError("Já existe usuário cadastrado!", 405)
  }

  const passwordHash = await hash(password, 8)

  const dataUser = {
    user,
    password: passwordHash,
    name,
    role,
    permission: "default",
    activated: true,
    store
  }

  return await database("users").insert(dataUser)
}
