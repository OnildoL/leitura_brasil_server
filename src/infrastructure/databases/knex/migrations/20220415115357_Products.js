export const up = knex => knex.schema.createTable("products", table => {
  table.increments("id")
  
  table.text("access_key").notNullable()
  table.text("code")
  table.text("description")
  table.text("isbn")
  table.text("ncm")
  table.text("cfop")

  table.text("qnd")
  table.text("unit")
  table.text("icms")
  table.text("ipi")

  table.text("store").notNullable()

  table.text("registration")
  table.integer("hangtag")
  table.text("price")
  table.integer("amount_children")

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("products")
