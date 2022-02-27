import knexfile from "../../../../knexfile.js"
import knex from "knex"
import notes_arquivei from "./consolidation_acertos.json"

export const database = knex(knexfile["development"])

async function main() {
  for (const note of notes_arquivei) {
    
    // const provider_check = await database("providers")
    //   .where({ 
    //     // provider: note.publishing_company, 
    //     number_nerus: note.number_system 
    //   })

    // if (provider_check.length === 0 && note.publishing_company !== "-") {
    //   const data = { 
    //     provider: note.publishing_company, 
    //     number_nerus: note.number_system 
    //   }

    //   await database("providers").insert(data)
    // }

    const [provider] = await database("providers")
      .where({ 
        number_nerus: note.number_system 
      })
    
    const providerId = provider.id
// // ======================================================================================
//     const [check_providers_info] = await database("providers_info")
//       .where({
//         providers_id: providerId
//       })

//     if (!check_providers_info) {
//       await database("providers_info")
//         .insert({ 
//           activated: note.activated === "on" ? "yes" : "no",
//           discount: note.discount,
//           map: note.map,
//           brand: note.brand,
//           shipping: note.shipping,
//           store: 31,
//           providers_id: providerId,
//         })
//     }

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
        store: 31,
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

// main()
