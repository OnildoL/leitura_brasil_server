export const up = knex => knex.schema.createTable("notes", table => {
  table.increments("id")
  table.text("value").notNullable()
  table.text("nf").notNullable()
  table.text("issue").notNullable()
  table.text("provider").notNullable()

  table.text("yes")
  table.text("no")
  table.text("pending")
  table.text("hangtag")
  table.text("arrival")
  table.text("input")

  table.text("store").notNullable()

  table.timestamp("created_at").defaultTo(knex.fn.now())
  table.timestamp("updated_at").defaultTo(knex.fn.now())
})

export const down = knex => knex.schema.dropTable("notes")
