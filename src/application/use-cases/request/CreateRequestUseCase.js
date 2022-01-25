import { database } from "../../../main/app.js"
import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js"
import { FindByRequestUseCase } from "./FindByRequestUseCase.js"

export async function CreateRequestUseCase(data) {
  const { provider, month, year, request_value, store, goals_id } = data
  const requestExists = await FindByRequestUseCase(data)
  
  if (requestExists) {
    throw new AppError("Já existe pedido cadastrado!", 405)
  }

  const dataRequest = { provider, month, year, request_value, store, goals_id }

  return await database("requests_inputs").insert(dataRequest)
}
