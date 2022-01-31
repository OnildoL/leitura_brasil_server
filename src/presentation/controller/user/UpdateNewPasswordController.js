import { UpdateNewPasswordUseCase } from "../../../application/use-cases/user/UpdateNewPasswordUseCase.js"

export async function UpdateNewPasswordController(request, response) {
  const { user_id } = request

  const { password, current_password } = request.body

  const data = { password, current_password, user_id }

  await UpdateNewPasswordUseCase(data)

  return response.status(200).send()
}
