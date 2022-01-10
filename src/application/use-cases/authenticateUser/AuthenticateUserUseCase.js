import { compare } from "bcrypt"
import { FindOneUserUseCase } from "../user/FindOneUserUseCase.js"
import pkg from "jsonwebtoken"

const { sign } = pkg

export async function AuthenticateUserUseCase({ userNumber, userPassword }) {
  const { id, user, password, name, role, activated, store } = await FindOneUserUseCase(userNumber)
  
  if (!id) {
    throw new Error("Usuário ou senha incorreto!")
  }

  if (!activated) {
    throw new Error("Usuário desativado!")
  }

  const passwordMatch = await compare(userPassword, password)

  if (!passwordMatch) {
    throw new Error("Usuário ou senha incorreto!")
  }

  const token = sign({ id, user, name, role, activated, store }, "2bc9b913f7757c390dc18bce817d476b", {
    subject: `${id}`,
    expiresIn: "1d"
  })

  const data = { id, user, name, role, activated, store }

  return { data, token }
}