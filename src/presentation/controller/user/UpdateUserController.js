import { UpdateUserUseCase } from "../../../application/use-cases/user/UpdateUserUseCase.js"

export async function UpdateUserController(request, response) {
  const { id } = request.params
  const user = request.body

  await UpdateUserUseCase({ id, user })

  return response.status(200).send()
}
