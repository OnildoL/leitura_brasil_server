import { EditionProviderUseCase } from "../../../application/use-cases/provider/EditionProviderUseCase.js"

export async function EditionProviderController(request, response) {
  const data = request.body

  await EditionProviderUseCase(data)

  return response.status(200).send()
}
