import { AuthenticateUserUseCase } from "../../../application/use-cases/authenticateUser/AuthenticateUserUseCase.js"

export async function AuthenticateUserController(request, response) {
  const { user, password } = request.body
  
  const token = await AuthenticateUserUseCase({ userNumber: user, userPassword: password })

  return response.status(200).json(token)
}