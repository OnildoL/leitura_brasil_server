import { FindAllUserListUseCase } from "../../../application/use-cases/user/FindAllUserListUseCase.js"

export async function UserListController(request, response) {
  try {
    const users = await FindAllUserListUseCase()

    return response.status(200).json(users)
  } catch {
    return response.status(400).send()
  }
}
