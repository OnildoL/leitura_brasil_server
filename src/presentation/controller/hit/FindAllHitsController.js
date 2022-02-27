import { FindAllHitsUseCase } from "../../../application/use-cases/hit/FindAllHitsUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"


export async function FindAllHitsController(request, response) {
  const { user_id } = request

  const { id } = request.params // providers_info_id

  const { store } = await FindByIdUserUseCase(Number(user_id))

  const hits = await FindAllHitsUseCase(store, id)

  return response.status(200).json(hits)
}
