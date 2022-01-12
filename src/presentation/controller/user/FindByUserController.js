import { FindByUserUseCase } from "../../../application/use-cases/user/FindByUserUseCase.js"

export async function FindByUserController(request, response) {
  const { user } = request
  
  const { id, name, role, activated, store } = await FindByUserUseCase(user)

  return response.status(200).json({ id, user, name, role, activated, store })
}
