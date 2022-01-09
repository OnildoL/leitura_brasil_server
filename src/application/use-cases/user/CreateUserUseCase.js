import { database } from "../../../main/app.js"
import { hash } from "bcrypt"

export async function CreateUserUseCase(data) {
  const { user, password, name, role, store } = data
  const passwordHash = await hash(password, 8)

  const dataUser = {
    user,
    password: passwordHash,
    name,
    role,
    permission: "all",
    activated: true,
    store
  }

  return await database("users").insert(dataUser)
}
