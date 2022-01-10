export const up = knex => knex.schema.createTable("permissions", table => {
  table.increments("id")
  table.text("permission")

  table.integer("role_id")
    .references("roles.id")
    .notNullable()
    .onDelete("CASCADE")

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("permissions")
