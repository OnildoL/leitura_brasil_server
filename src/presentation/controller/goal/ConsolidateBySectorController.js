import { ConsolidateBySectorUseCase, filtersConsolidatedBySector } from "../../../application/use-cases/goal/ConsolidatedBySectorUseCase.js"

export async function ConsolidateBySectorController(request, response) {
  const { year, store, sector } = request.params
  
  const consolidated = await ConsolidateBySectorUseCase(year, store, sector)

  const data = await filtersConsolidatedBySector(JSON.parse(consolidated), sector)

  return response.status(200).json(JSON.parse(data))
}
