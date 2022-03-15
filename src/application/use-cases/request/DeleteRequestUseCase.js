import { database } from "../../../main/app.js"
import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js"

export async function DeleteRequestUseCase(id) {
  const [isLinkNote] = await database("notes")
    .where({ requests_inputs_id: id })

  if (isLinkNote) {
    throw new AppError("Existe nota(s) vinculada(s) a esse pedido!", 405)
  }  

  return await database("requests_inputs")
    .delete()
    .where({ id })
}