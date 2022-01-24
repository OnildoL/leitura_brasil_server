import { YearConsolidationUseCase } from "../../../application/use-cases/goal/YearConsolidationUseCase.js"

export async function YearConsolidationController(request, response) {
  const { year, store } = request.params

  const { consolidated, totals } = await YearConsolidationUseCase(year, store)

  return response.status(200).json({ consolidated, totals })
}
