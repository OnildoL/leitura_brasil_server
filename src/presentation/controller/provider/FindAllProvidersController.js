import { FindAllProvidersIdUseCase, FindAllProvidersUseCase } from "../../../application/use-cases/provider/FindAllProvidersUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"

export async function FindAllProvidersController(request, response) {
  const { selectStore } = request.query
  const { user_id } = request

  const { activated } = request.params
  
  const { store } = await FindByIdUserUseCase(Number(user_id))

  const chosen_store = !selectStore ? store : selectStore

  const providers = await FindAllProvidersUseCase(chosen_store, activated)

  return response.status(200).json(providers)
}

export async function FindAllProvidersIdController(request, response) {
  const providers = await FindAllProvidersIdUseCase()

  return response.status(200).json(providers)
}