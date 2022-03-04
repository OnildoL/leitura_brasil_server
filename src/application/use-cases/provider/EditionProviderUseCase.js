import { database } from "../../../main/app.js"

export async function EditionProviderUseCase(data) {
  const { activated, discount, map, brand, shipping, store, providers_id } = data
  
  const update = {
    activated,
    discount, 
    map, 
    brand,
    shipping 
  }

  return await database("providers_info")
    .update(update)
    .where({ store, id: providers_id })
}
