import { database } from "../../../main/app.js"

export async function CreateUserTokensUseCase(data) {
  const { expires_date, refresh_token, user_id } = data

  const userToken = { 
    user_id,
    expires_date, 
    refresh_token
  }

  return await database("users_tokens").insert(userToken)
}
