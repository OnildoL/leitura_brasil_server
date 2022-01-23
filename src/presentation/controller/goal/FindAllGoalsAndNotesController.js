import { FindAllGoalsAndNotesUseCase } from "../../../application/use-cases/goal/FindAllGoalsAndNotesUseCase.js"

export async function FindAllGoalsAndNotesController(request, response) {
  const { year, store, sector } = request.params

  const requestsAndNotes = await FindAllGoalsAndNotesUseCase(year, store, sector)

  return response.status(200).json(JSON.parse(requestsAndNotes))
}
