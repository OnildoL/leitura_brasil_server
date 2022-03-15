import { database } from "../../../main/app.js"

export async function FindAllHitsYearMonthUseCase({ store, year, month }) {
  const dataResult = []
  
  const hits = await database("hits")
    .where({ store, year, month })
  
  for (const hit of hits) {
    const notes = await database("notes")
      .where({ hits_id: hit.id })

    const [providers_info] = await database("providers_info")
      .where({ id: hit.providers_info_id })
      
    const [provider] = await database("providers")
      .where({ id: providers_info.providers_id })
      
    dataResult.push({
      ...hit,
      provider: provider.provider,
      notes: notes
    })
  }
  
  return dataResult
}
