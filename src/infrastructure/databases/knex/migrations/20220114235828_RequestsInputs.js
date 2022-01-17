export const up = knex => knex.schema.createTable("requests_inputs", table => {
  table.increments("id")
  table.text("provider").notNullable()
  table.text("month").notNullable()
  table.text("year").notNullable()
  table.text("request_value").notNullable()
  
  table.text("store").notNullable()

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("requests_inputs")
