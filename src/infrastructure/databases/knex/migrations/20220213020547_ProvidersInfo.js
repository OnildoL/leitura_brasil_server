export const up = knex => knex.schema.createTable("providers_info", table => {
  table.increments("id")
  table.text("activated")
  table.text("discount")
  table.text("map")
  table.text("brand")
  table.text("shipping")

  table.text("store").notNullable()

  table.integer("providers_id").notNullable()
    .references("providers.id")

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("providers_info")
