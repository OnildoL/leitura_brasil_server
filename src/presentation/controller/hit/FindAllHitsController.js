import { FindAllHitsUseCase } from "../../../application/use-cases/hit/FindAllHitsUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"


export async function FindAllHitsController(request, response) {
  const { selectStore } = request.query
  const { user_id } = request

  const { id } = request.params // providers_info_id

  const { store } = await FindByIdUserUseCase(Number(user_id))

  const chosen_store = !selectStore ? store : selectStore

  const hits = await FindAllHitsUseCase(chosen_store, id)

  return response.status(200).json(hits)
}
