import { FindByUserUseCase } from "../../../application/use-cases/user/FindByUserUseCase.js"

export async function FindByUserController(request, response) {
  const { user } = request
  
  const { id, name, role, activated, store, permission } = await FindByUserUseCase(user)
  const permissionSplit = permission.split(",")

  return response.status(200).json({ id, user, name, role, activated, store, permission: permissionSplit })
}
