import { database } from "../../../main/app.js"
import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js"

export async function CreateProviderUseCase(data) {
  return await database("providers")
    .insert(data)
}

export async function CreateProviderInfoUseCase(data) {
  const { store, providers_id } = data

  const [verifyProviderInfoExists] = await database("providers_info")
    .where({ store, providers_id })

  if (verifyProviderInfoExists) {
    throw new AppError("Já existe editora cadastrada", 405)
  }

  return await database("providers_info")
    .insert(data)
}
