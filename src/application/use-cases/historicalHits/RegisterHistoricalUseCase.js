import xlsx from "xlsx"
import { database } from "../../../main/app.js"
import { unLink } from "../../../main/utils/unlink.js"

async function FindProvider(number_nerus) {
  const [provider] = await database("providers")
    .where({ number_nerus })
  
  return provider
}

async function CreateProvider(data) {
  const { provider, number_nerus } = data

  await database("providers")
    .insert({ provider, number_nerus })
  
  return 
}

const getMonthNumber = monthNumber => ({
  "JAN": 1, "FEV": 2, "MAR": 3, "ABR": 4, "MAI": 5, "JUN": 6, 
  "JUL": 7, "AGO": 8, "SET": 9, "OUT": 10, "NOV": 11, "DEZ": 12,
})[monthNumber]

export async function RegisterHistoricalUseCase(data) {
  const { store, year, month, file_name } = data
  const work_book = xlsx.readFile(`uploads/${file_name}`, { cellDates: true })
  const work_sheet = work_book.Sheets[work_book.SheetNames[0]]
  const hits = []
  let totalRows = 0

  for (const i in work_sheet) {
    totalRows = parseInt(work_sheet[i].match(/:\D(\d+)/)[1])
    break
  }

  for (let i = 0; i <= totalRows; i++) {
    if (work_sheet[`A${i}`]) {
      if (work_sheet[`A${i}`].v !== "Editoras") {
        const provider = !work_sheet[`A${i}`] ? "" : work_sheet[`A${i}`].v.toString()
        const number_nerus = !work_sheet[`B${i}`] ? "" : work_sheet[`B${i}`].v.toString()
        const last_hit = !work_sheet[`C${i}`] ? "" : work_sheet[`C${i}`].v
        const current_hit = !work_sheet[`D${i}`] ? "" : work_sheet[`D${i}`].v
        const value_nerus = !work_sheet[`E${i}`] ? "" : work_sheet[`E${i}`].v.toString()
        const sales_report = !work_sheet[`F${i}`] ? "" : work_sheet[`F${i}`].v.toString()
        const nf = !work_sheet[`G${i}`] ? "" : work_sheet[`G${i}`].v.toString()
        const reason = !work_sheet[`H${i}`] ? "" : work_sheet[`H${i}`].v.toString()

        hits.push({
          store,
          year,
          month,
          provider,
          number_nerus,
          last_hit,
          current_hit,
          value_nerus,
          sales_report,
          nf,
          reason,
        })
      }
    }
  }

  for (const hit of hits) {
    const provider = await FindProvider(hit.number_nerus)

    if (!provider) {
      const  data = { 
        provider: hit.provider, 
        number_nerus: hit.number_nerus
      }

      await CreateProvider(data)
    }

    const provider2 = await FindProvider(hit.number_nerus)

    const [check_providers_info] = await database("providers_info")
      .where({
        providers_id: provider2.id,
        store: hit.store
      })

    if (!check_providers_info) {
      await database("providers_info")
        .insert({ 
          activated: "yes",
          discount: "",
          map: "",
          brand: "",
          shipping: "",
          store: store,
          providers_id: provider2.id,
        })
    }

    const [check_providers_info2] = await database("providers_info")
      .where({
        providers_id: provider2.id,
        store: hit.store
      })

    await database("hits")
      .insert({
        situation: "-",
        month: hit.month,
        year: hit.year,
        last_hit: hit.last_hit && new Intl.DateTimeFormat("pt-BR").format(new Date(hit.last_hit)),
        current_hit: hit.current_hit && new Intl.DateTimeFormat("pt-BR").format(new Date(hit.current_hit)),
        value_nerus: hit.value_nerus,
        sales_report: hit.sales_report,
        store: hit.store,
        reason: hit.reason,
        providers_info_id: check_providers_info2.id
      })

    const [hitt] = await database("hits")
      .where({ 
        month: hit.month,
        year: hit.year,
        providers_info_id: check_providers_info2.id,
        store: hit.store
      })

    if (hit.nf) {
      await database("notes")
        .insert({
          access_key: "",
          cnpj: "",
          value: 0,
          nf: hit.nf,
          issue: new Date(`${year}-${getMonthNumber(month)}-01`),
          provider: hit.provider,
          hangtag: "",
          store: hit.store,
          year: hit.year,
          hits_id: hitt.id
        })
    }
  }

  unLink(file_name)

  return
}