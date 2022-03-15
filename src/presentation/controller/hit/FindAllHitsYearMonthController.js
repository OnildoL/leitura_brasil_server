import { FindAllHitsYearMonthUseCase } from "../../../application/use-cases/hit/FindAllHitsYearMonthUseCase.js"

export async function FindAllHitsYearMonthController(request, response) {
  const { data } = request.query

  const info = JSON.parse(data)

  const hits = await FindAllHitsYearMonthUseCase(info)

  return response.status(200).json(hits)
}
