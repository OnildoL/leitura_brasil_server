import { CreateProviderInfoUseCase, CreateProviderUseCase } from "../../../application/use-cases/provider/CreateProviderUseCase.js"

export async function CreateProviderController(request, response) {
  const data = request.body

  await CreateProviderUseCase(data)

  return response.status(200).send()
}

export async function CreateProviderInfoController(request, response) {
  const data = request.body

  await CreateProviderInfoUseCase(data)

  return response.status(200).send()
}
