import { CreateUserUseCase } from "../../../application/use-cases/user/CreateUserUseCase.js"

export async function CreateUserController(request, response) {
  const { user, password, name, role, store } = request.body

  const userData = { user, password, name, role, store }

  await CreateUserUseCase(userData)

  return response.status(201).send()
}