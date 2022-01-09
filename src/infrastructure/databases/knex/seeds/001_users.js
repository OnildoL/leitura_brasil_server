export const seed = knex => {
  return knex("users").del()
    .then(function () {
      return knex("users").insert([
        {
          user: 3145,
          password: "759466",
          name: "Onildo Gonçalves",
          role: "Developer",
          permission: "all",
          activated: true,
          store: "31"
        }
      ])
    })
}
