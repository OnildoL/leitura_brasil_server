export const up = knex => knex.schema.createTable("users", table => {
  table.increments("id")
  table.text("user").unique().notNullable()
  table.text("password").notNullable()
  table.text("name").notNullable()
  table.text("role")
  table.text("permission")
  table.boolean("activated")
  table.text("store")

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("users")
