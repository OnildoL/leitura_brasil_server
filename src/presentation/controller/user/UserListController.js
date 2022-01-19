import { FindAllUserListUseCase } from "../../../application/use-cases/user/FindAllUserListUseCase.js"
import { FindByUserUseCase } from "../../../application/use-cases/user/FindByUserUseCase.js"

export async function UserListController(request, response) {
  const { user } = request
  
  const userData = await FindByUserUseCase(user)

  const users = await FindAllUserListUseCase(userData.permission.includes("all"), userData.store)

  return response.status(200).json(users)
}
