export const up = knex => knex.schema.createTable("goals", table => {
  table.increments("id")
  table.text("goal").notNullable()
  table.text("sector").notNullable()
  table.text("month").notNullable()
  table.text("year").notNullable()

  table.text("store").notNullable()

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("goals")
