export const up = knex => knex.schema.createTable("providers", table => {
  table.increments("id")
  table.text("provider").notNullable()
  table.text("number_nerus")

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("providers")
