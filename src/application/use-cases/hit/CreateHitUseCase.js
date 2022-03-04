import { database } from "../../../main/app.js"
import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js"

export async function CreateHitUseCase(data) {
  const { month, year, store, providers_info_id } = data

  const [hit] = await database("hits")
    .where({ month, year, store, providers_info_id })

  if (hit) {
    throw new AppError("Já existe acerto cadastrado para esse ano e mês!", 405)
  }

  return await database("hits")
    .insert(data)
}
