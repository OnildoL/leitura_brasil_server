export const up = knex => knex.schema.createTable("roles", table => {
  table.increments("id")
  table.text("role")

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("roles")
