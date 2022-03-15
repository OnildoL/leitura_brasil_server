import { ConsolidationHitsUseCase } from "../../../application/use-cases/hit/ConsolidationHitsUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"

export async function ConsolidationHitsController(request, response) {
  const { user_id } = request
  const { store } = await FindByIdUserUseCase(Number(user_id))
  
  const consolidation = await ConsolidationHitsUseCase(store)

  return response.status(200).json(consolidation)
}
