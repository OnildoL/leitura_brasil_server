import { FindHitPerProviderIdUseCase } from "../../../application/use-cases/hit/FindHitPerProviderIdUseCase.js"

export async function FindHitPerProviderIdController(request, response) {
  const { data } = request.query
  
  const hit = await FindHitPerProviderIdUseCase(JSON.parse(data))

  return response.status(200).json(hit)
}
