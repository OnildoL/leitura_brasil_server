import { database } from "../../../main/app.js"

export async function FindByUserIdAndRefreshTokenUseCase(user_id, refresh_token) {
  const [data] = await database("users_tokens")
    .where({ 
      user_id,
      refresh_token
    })

  return data
}
