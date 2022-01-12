export const up = knex => knex.schema.createTable("users_tokens", table => {
  table.increments("id")
  table.text("refresh_token").notNullable()
  table.timestamp("expires_date")

  table.integer("user_id")
    .references("users.id")
    .notNullable()
    .onDelete("CASCADE")

  table.timestamp("created_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("users_tokens")
