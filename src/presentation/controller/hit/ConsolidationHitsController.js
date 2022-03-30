import { ConsolidationHitsUseCase } from "../../../application/use-cases/hit/ConsolidationHitsUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"

export async function ConsolidationHitsController(request, response) {
  const { selectStore } = request.query
  const { user_id } = request
  const { store } = await FindByIdUserUseCase(Number(user_id))

  const chosen_store = !selectStore ? store : selectStore
  
  const consolidation = await ConsolidationHitsUseCase(chosen_store)

  return response.status(200).json(consolidation)
}
