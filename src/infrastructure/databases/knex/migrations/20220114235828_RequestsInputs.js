export const up = knex => knex.schema.createTable("requests_inputs", table => {
  table.increments("id")
  table.text("provider").notNullable()
  table.text("month_name").notNullable()
  table.text("year_name").notNullable()
  table.text("request_value").notNullable()
  table.text("value_nf")
  table.text("nf")
  table.text("issue")
  table.text("store").notNullable()

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("requests_inputs")
