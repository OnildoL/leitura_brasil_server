export const seed = knex => {
  return knex("roles").del()
    .then(function () {
      return knex("roles").insert([
        {
          role: "developer",
        }
      ])
    })
}
