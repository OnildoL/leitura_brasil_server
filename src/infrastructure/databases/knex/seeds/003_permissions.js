export const seed = knex => {
  return knex("permissions").del()
    .then(function () {
      return knex("permissions").insert([
        {
          permission: "all",
          role_id: 1
        }
      ])
    })
}
