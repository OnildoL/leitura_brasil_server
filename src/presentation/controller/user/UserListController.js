import { FindAllUserListUseCase } from "../../../application/use-cases/user/FindAllUserListUseCase.js"
import { FindByUserUseCase } from "../../../application/use-cases/user/FindByUserUseCase.js"

export async function UserListController(request, response) {
  try {
    const { user } = request
    
    const userData = await FindByUserUseCase(user)

    const users = await FindAllUserListUseCase(userData.role, userData.store)

    return response.status(200).json(users)
  } catch {
    return response.status(400).send()
  }
}
