import { AuthenticateUserUseCase } from "../../../application/use-cases/authenticateUser/AuthenticateUserUseCase.js"

export async function AuthenticateUserController(request, response) {
  try {
    const { user, password } = request.body
    const token = await AuthenticateUserUseCase({ userNumber: user, userPassword: password })

    return response.status(200).json(token)
  } catch (error) {
    console.log(error)
    return response.status(400).send()
  }
}