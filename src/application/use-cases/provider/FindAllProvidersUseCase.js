import { database } from "../../../main/app.js"

export async function FindAllProvidersUseCase(store) {
  const data = []

  const providers = await database("providers_info")
    .where({ store, activated: "yes" })
    .join("providers", "providers.id", "=", "providers_info.providers_id")
    .orderBy("provider", "ASC")
    .select(
      "providers_info.id",
      "providers_info.activated",
      "providers_info.discount",
      "providers_info.map",
      "providers_info.brand",
      "providers_info.shipping",
      "providers_info.store",
      "providers_info.providers_id",
      "providers.provider",
      "providers.number_nerus",
    )

  for (const provider of providers) {
    const getMonthText = monthNumber => ({
      "1": "JAN", "2": "FEV", "3": "MAR", "4": "ABR", "5": "MAI", "6": "JUN", 
      "7": "JUL", "8": "AGO", "9": "SET", "10": "OUT", "11": "NOV", "12": "DEZ",
    })[monthNumber]
    
    const [ hit ] = await database("hits")
    .where({ 
      year: new Date().getFullYear(), 
      month: getMonthText(`${new Date().getMonth() + 1}`),
      providers_info_id: provider.id
    })

    data.push({ 
      ...provider,
      right: !hit?.current_hit ? "Acertar" : "Acertado" 
    })
  }

  return data
}