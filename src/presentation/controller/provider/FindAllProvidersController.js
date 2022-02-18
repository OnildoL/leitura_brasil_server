import { FindAllProvidersUseCase } from "../../../application/use-cases/provider/FindAllProvidersUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"

export async function FindAllProvidersController(request, response) {
  const { user_id } = request
  
  const { store } = await FindByIdUserUseCase(Number(user_id))

  const providers = await FindAllProvidersUseCase(store)

  return response.status(200).json(providers)
}