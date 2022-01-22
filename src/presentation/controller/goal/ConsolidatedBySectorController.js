import { ConsolidatedBySectorUseCase } from "../../../application/use-cases/goal/ConsolidatedBySectorUseCase.js"

export async function ConsolidatedBySectorController(request, response) {
  const { year, store } = request.params
  
  const consolidated = await ConsolidatedBySectorUseCase(year, store)

  return response.status(200).json(JSON.parse(consolidated))
}
