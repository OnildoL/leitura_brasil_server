import { database } from "../../../main/app.js"

export async function FindHitPerProviderIdUseCase(data) {
  const { providers_id, month, year, store } = data

  const [providerInfo] = await database("providers_info")
    .where({ providers_id, store })

  const hit = await database("hits")
    .where({
      month,
      year,
      providers_info_id: providerInfo.id
    })
  
  return hit
}
