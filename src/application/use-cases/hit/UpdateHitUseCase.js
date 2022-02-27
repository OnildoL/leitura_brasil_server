import { database } from "../../../main/app.js"

export async function UpdateHitUseCase(data) {
  const { 
    id, 
    last_hit, 
    current_hit, 
    sales_report, 
    value_nerus, 
    comments, 
    situation 
  } = data

  const update = {
    last_hit, 
    current_hit, 
    sales_report, 
    value_nerus, 
    comments, 
    situation,
    updated_at: new Date()
  }

  return await database("hits")
    .update(update)
    .where({ id })
}
