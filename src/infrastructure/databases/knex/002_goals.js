export const seed = knex => {
  return knex("goals")
    .then(function () {
      return knex("goals").insert([
        {
          goal: "10000",
          sector: "papelaria",
          month: "FEV",
          year: "2022",
          store: "31",
        }
      ])
    })
}
