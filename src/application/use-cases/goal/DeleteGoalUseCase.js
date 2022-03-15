import { database } from "../../../main/app.js"
import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js"

export async function DeleteGoalUseCase(id) {
  const [isLinkRequest] = await database("requests_inputs")
    .where({ goals_id: id })

  if (isLinkRequest) {
    throw new AppError("Existe pedido(s) vinculado(s) a essa meta!", 405)
  }  

  return await database("goals")
    .delete()
    .where({ id })
}