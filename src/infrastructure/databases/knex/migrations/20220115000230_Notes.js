export const up = knex => knex.schema.createTable("notes", table => {
  table.increments("id")
  table.text("access_key").notNullable()
  table.text("cnpj").notNullable()
  table.text("value").notNullable()
  table.text("nf").notNullable()
  table.text("issue").notNullable()
  table.text("provider").notNullable()

  table.text("receive")

  table.text("hangtag")
  table.text("arrival")
  table.text("input")
  table.text("comment")

  table.text("shipping_type")
  table.text("situation")
  table.text("loss")
  table.text("discount")
  table.text("percentage")
  table.boolean("catch_products")
  
  table.integer("requests_inputs_id")
  .references("requests_inputs.id")
  
  table.text("store").notNullable()
  
  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
  
  table.text("year")
})

export const down = knex => knex.schema.dropTable("notes")
