import { RegisterHistoricalUseCase } from "../../../application/use-cases/historicalHits/RegisterHistoricalUseCase.js"

export async function RegisterHistoricalController(request, response) {
  try {
    const { store, month, year } = request.query
    const file = request.file
    const file_name = file.originalname

    const data = { store, month, year, file_name }

    await RegisterHistoricalUseCase(data)

    return response.status(200).send()
  } catch (error) {
    console.log(error)
    return response.status(200).send()
  }
}