export const up = knex => knex.schema.createTable("hits", table => {
  table.increments("id")
  table.text("situation")
  table.text("month").notNullable()
  table.text("year").notNullable()
  table.text("last_hit")
  table.text("current_hit")
  table.text("value_nerus")
  table.text("sales_report")
  table.text("comments")

  table.text("store").notNullable()

  table.integer("providers_info_id").notNullable()
    .references("providers_info.id")

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("hits")
