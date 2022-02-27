import { database } from "../../../main/app.js"

const getMonthNumber = monthNumber => ({
  "JAN": 1, "FEV": 2, "MAR": 3, "ABR": 4, "MAI": 5, "JUN": 6, 
  "JUL": 7, "AGO": 8, "SET": 9, "OUT": 10, "NOV": 11, "DEZ": 12,
})[monthNumber]

const getMonthText = monthNumber => ({
  "1": "JAN", "2": "FEV", "3": "MAR", "4": "ABR", "5": "MAI", "6": "JUN", 
  "7": "JUL", "8": "AGO", "9": "SET", "10": "OUT", "11": "NOV", "12": "DEZ",
})[monthNumber]

async function getNotesLinkHits(hits_id) {
  const hits = await database("notes")
    .where({ hits_id })
    .join("hits", "hits.id", "=", "notes.hits_id")
    .select(
      "notes.id as note_id",
      "notes.access_key",
      "notes.cnpj",
      "notes.value as note_value",
      "notes.nf",
      "notes.issue",
      "notes.provider as note_provider",
    )
  
  return hits
}

export async function FindAllHitsUseCase(store, providers_info_id) {
  const data = []
  const data_hits = []

  const hits = await database("hits")
    .orderBy("year", "desc")
    .orderBy("last_hit", "desc")
    .where({ store, providers_info_id })

  for (let hit of hits) {
    hit.year = Number(hit.year)
    hit.month = getMonthNumber(hit.month)
    const note = await getNotesLinkHits(hit.id)

    data.push({
      ...hit,
      notes: note
    })
  }

  let yearsSet = new Set()
  let years = []

  for (const goalData of data) {
    if (!yearsSet.has(goalData.year)) {
      yearsSet.add(goalData.year)
      years.push(goalData.year)
    }
  }

  for await (const year of years.sort((a, b) => a < b ? 1 : -1)) {
    const filter_year = data.filter(hitYear => hitYear.year === year)
    const sorted = filter_year
      .sort((a, b) => a.month < b.month ? 1 : -1)

    for (let hit of sorted) {
      hit.month = getMonthText(`${hit.month}`)
    }

    data_hits.push(...sorted)
  }

  return data_hits
}
