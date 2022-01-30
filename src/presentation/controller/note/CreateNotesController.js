import { CaptureNotesUseCase } from "../../../application/use-cases/note/CaptureNotesUseCase.js"
import { CreateNotesUseCase } from "../../../application/use-cases/note/CreateNotesUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"

export async function CreateNotesController(request, response) {
  const file = request.file
  
  const { user_id } = request

  const file_name = file.originalname

  const { store } = await FindByIdUserUseCase(user_id)

  const notes = await CaptureNotesUseCase(file_name, store)
  
  await CreateNotesUseCase(notes)

  return response.status(201).send()
}
