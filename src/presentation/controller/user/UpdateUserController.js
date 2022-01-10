import { UpdateUserUseCase } from "../../../application/use-cases/user/UpdateUserUseCase.js"

export async function UpdateUserController(request, response) {
  try {
    const { id } = request.params
    const { role, permission, activated } = request.body
    const userData = { id, role, permission, activated }

    await UpdateUserUseCase(userData)

    return response.status(200).send()
  } catch {
    return response.status(400).send()
  }
}
