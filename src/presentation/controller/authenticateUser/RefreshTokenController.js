import { RefreshTokenUseCase } from "../../../application/use-cases/authenticateUser/RefreshTokenUseCase.js"

export async function RefreshTokenController(request, response) {
  try {
    const { user_id } = request
    const refreshToken = request.body.refresh_token

    const { user, token, refresh_token } = await RefreshTokenUseCase(refreshToken, user_id)

    return response.status(200).json({ user, token, refresh_token })
  } catch (error) {
    console.log(error)
    return response.status(400).send()
  }
}
