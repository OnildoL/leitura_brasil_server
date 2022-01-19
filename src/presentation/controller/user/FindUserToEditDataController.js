import { FindByUserUseCase } from "../../../application/use-cases/user/FindByUserUseCase.js"

export async function FindUserToEditDataController(request, response) {
  const { user: userNumber } = request.params

  const {
    id,
    user,
    name,
    role,
    store,
    permission,
    activated,
    created_at,
    updated_at
  } = await FindByUserUseCase(userNumber)

  return response.status(200).json({
    id,
    user,
    name,
    role,
    store,
    permission,
    activated,
    created_at,
    updated_at
  })
}
