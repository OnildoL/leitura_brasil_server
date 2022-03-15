import { database } from "../../../main/app.js"
import { randomUUID } from "crypto"

async function getTotalYears(data) {
  let yearsSet = new Set()
  let years = []

  const hits = data
  
  for await (const hit of hits) {
    if (!yearsSet.has(hit.year)) {
      yearsSet.add(hit.year)
      years.push({
        year: parseInt(hit.year),
      })
    }
  }

  return years.sort((a, b) => a.year < b.year ? 1 : -1)
}

async function filterNotesHits(result, notes) {
  const filterHits = []

  for (const hit of result) {
    const note = notes.filter(note => note.hits_id === hit.id)
    filterHits.push({
      ...hit,
      notes: JSON.stringify(note)
    })
  }

  return filterHits
}

export async function ConsolidationHitsUseCase(store) {
  const consolidated = []
  const months = ["DEZ", "NOV", "OUT", "SET", "AGO", "JUL", "JUN", "MAI", "ABR", "MAR", "FEV", "JAN"]
  const hits = await database("hits")
    .where({store})
  const years = await getTotalYears(hits)
  const notes = await database("notes").where({ store })
  
  for await (const year of years) {
    for (const month of months) {
      const result = hits.filter(hit => parseInt(hit.year) === year.year && hit.month === month)
      const filter_notes_hits = await filterNotesHits(result, notes)
      const nfs_hit = []

      const { sales_report, value_nerus, monthName, yearName } = filter_notes_hits.reduce((accumulator, { month, year, sales_report, value_nerus }) => {
        accumulator.yearName = year
        accumulator.monthName = month
        accumulator.sales_report = accumulator.sales_report + Number(sales_report) || Number(sales_report)
        accumulator.value_nerus = accumulator.value_nerus + Number(value_nerus) || Number(value_nerus)
    
        return accumulator
      }, {})
      
      for await (const note of filter_notes_hits) {
        const nfs = JSON.parse(note.notes)
        nfs_hit.push(...nfs)
      }
      
      const { value_note } = nfs_hit.reduce((accumulator, { value }) => {
        accumulator.value_note = accumulator.value_note + Number(value) || Number(value)
    
        return accumulator
      }, {})
      
      if (yearName && monthName) {
        consolidated.push({ 
          id: randomUUID(),
          yearName, 
          monthName, 
          sales_report, 
          value_nerus, 
          value_note,
        })
      }
    }
  }

  return consolidated
}
