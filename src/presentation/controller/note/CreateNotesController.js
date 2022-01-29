import { CreateNotesUseCase } from "../../../application/use-cases/note/CreateNotesUseCase.js"
import { FindByIdUserUseCase } from "../../../application/use-cases/user/FindByIdUserUseCase.js"

export async function CreateNotesController(request, response) {
  const file = request.file
  
  const { user_id } = request

  const file_name = file.originalname

  const { store } = await FindByIdUserUseCase(user_id)

  await CreateNotesUseCase(file_name, store)

  return response.status(201).send()
}
