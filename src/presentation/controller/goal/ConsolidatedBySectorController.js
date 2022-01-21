import { ConsolidatedBySectorUseCase } from "../../../application/use-cases/goal/ConsolidatedBySectorUseCase.js"

export async function ConsolidatedBySectorController(request, response) {
  const { year } = request.params
  
  const consolidated = await ConsolidatedBySectorUseCase(year)

  return response.status(200).json(JSON.parse(consolidated))
}
