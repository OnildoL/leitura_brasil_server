import { database } from "../../../main/app.js";
import { AppError } from "../../../presentation/middleware/middlewareAppError/AppError.js";
import { FindByAccessKeyUseCase } from "./FindByAccessKeyUseCase.js";

export async function UpdateOneNoteUseCase(access_key, update) {
  if (isNaN(access_key)) {
    throw new AppError("Chave de acesso inválida!", 405)
  }

  if (access_key.length < 44) {
    throw new AppError("Chave de acesso inválida!", 405)
  }

  const accessKeyAlreadyExists = await FindByAccessKeyUseCase(access_key)
  
  if (!accessKeyAlreadyExists) {
    throw new AppError("Chave de acesso não existe!", 405)
  }

  return await database("notes")
    .update(update)
    .where({ access_key })
}
