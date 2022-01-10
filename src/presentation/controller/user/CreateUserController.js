import { CreateUserUseCase } from "../../../application/use-cases/user/CreateUserUseCase.js"

export async function CreateUserController(request, response) {
  try {
    const { user, password, name, role, store } = request.body

    const userData = { user, password, name, role, store }

    const result = await CreateUserUseCase(userData)

    return response.status(201).json(result)
  } catch (error) {
    return response.status(400).send()
  }
}