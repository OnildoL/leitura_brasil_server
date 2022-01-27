import { FindByNotePerRequestIdUseCase } from "../../../application/use-cases/note/FindByNotePerRequestIdUseCase.js"
import { AppError } from "../../middleware/middlewareAppError/AppError.js"

export async function FindByNotePerRequestIdController(request, response) {
  const { id } = request.params
  
  if (isNaN(id)) {
    throw new AppError("Não existe notas vinculadas!", 405)
  }

  const notes = await FindByNotePerRequestIdUseCase(Number(id))

  return response.status(200).json(notes)
}
