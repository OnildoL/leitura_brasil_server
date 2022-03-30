import knexfile from "../../../../knexfile.js"
import knex from "knex"
import xlsx from "xlsx"

export const database = knex(knexfile["development"])

async function getHits() {
  const work_book = xlsx.readFile("uploads/ACERTOS.xlsx", { cellDates:true })
  const work_sheet = work_book.Sheets[work_book.SheetNames[0]]
  const hits = []
  let cont = 0

  for (const i in work_sheet) {
    cont = parseInt(work_sheet[i].match(/:\D(\d+)/)[1])
    break 
  }

  for (let i = 0; i <= cont; i++) {
    if (work_sheet[`B${i}`]) {
      if (work_sheet[`B${i}`].v !== "EDITORAS") {
        const number_system = work_sheet[`A${i}`].v.toString()
        const publishing_company = work_sheet[`B${i}`].v.toString()
        const last_hit = !work_sheet[`C${i}`] ? "" : work_sheet[`C${i}`].v
        const current_hit =  !work_sheet[`D${i}`] ? "" : work_sheet[`D${i}`].v
        const value_nerus =  !work_sheet[`E${i}`] ? "" : work_sheet[`E${i}`].v.toString()
        const sales_report =  !work_sheet[`F${i}`] ? "" : work_sheet[`F${i}`].v.toString()
        const nf =  !work_sheet[`G${i}`] ? "" : work_sheet[`G${i}`].v.toString()
        const reason =  !work_sheet[`H${i}`] ? "" : work_sheet[`H${i}`].v.toString()

        hits.push({ 
          "publishing_company": publishing_company,
          "situation": "ok",
          "month_name": "JAN",
          "year_name": "2021",
          "last_hit": last_hit && new Intl.DateTimeFormat("pt-BR").format(last_hit),
          "current_hit": current_hit && new Intl.DateTimeFormat("pt-BR").format(current_hit),
          "value_nerus": value_nerus,
          "sales_report": sales_report,
          "note": "",
          "value_note": "",
          "comments_hit": "",
          "discount": "",
          "shipping": "",
          "brand": "",
          "map": "",
          "number_system": number_system,
          "provider": "CIA DAS LETRAS 1 QUINZENA",
          "comments": "",
          "reason": reason,
          "activated": "on",
          "notes": [
            // {
            //   "access_key": "35211255789390000899550010004843851941386852",
            //   "cnpj": "55789390000899",
            //   "value": "4834.56",
            //   "nf": "484385",
            //   "issue": "2021-12-28T14:20:05.000-03:00",
            //   "provider": "",
            //   "hangtag": "",
            //   "store": 04,
            //   "year": "2021"
            // }
          ]
        })
      }
    }
  }

  return hits
}

async function main() {
  const hits = await getHits()

  for (const note of hits) {
    const [provider] = await database("providers")
      .where({ 
        number_nerus: note.number_system 
      })

    const providerId = provider.id
// // ======================================================================================
    // const [check_providers_info] = await database("providers_info")
    //   .where({
    //     providers_id: providerId
    //   })

    // if (!check_providers_info) {
    //   await database("providers_info")
    //     .insert({ 
    //       activated: note.activated === "on" ? "yes" : "no",
    //       discount: note.discount,
    //       map: note.map,
    //       brand: note.brand,
    //       shipping: note.shipping,
    //       store: "04",
    //       providers_id: providerId,
    //     })
    // }

    const [providers_info] = await database("providers_info")
      .where({
        providers_id: providerId
      })

    await database("hits")
      .insert({
        situation: note.situation,
        month: note.month_name,
        year: note.year_name,
        last_hit: note.last_hit,
        current_hit: note.current_hit,
        value_nerus: note.value_nerus,
        sales_report: note.sales_report,
        store: "04",
        reason: note.reason,
        comments: note.comments_hit,
        providers_info_id: providers_info.id
      })

    const [hit] = await database("hits")
      .where({ 
        month: note.month_name,
        year: note.year_name,
        providers_info_id: providers_info.id
      })

    for (const nf of note.notes) {
      if (nf) {
        await database("notes")
          .insert({
            access_key: nf.access_key,
            cnpj: nf.cnpj,
            value: nf.value,
            nf: nf.nf,
            issue: nf.issue,
            provider: nf.provider,
            hangtag: nf.hangtag,
            store: nf.store,
            year: nf.year,
            hits_id: hit.id
          })
      }
    }

  }
} 

// main();