export const seed = knex => {
  return knex("requests_inputs")
    .then(function () {
      return knex("requests_inputs").insert([
        {
          provider: "TESTE",
          month: "FEV",
          year: "2022",
          request_value: "32000",
          store: "31"
        }
      ])
    })
}
