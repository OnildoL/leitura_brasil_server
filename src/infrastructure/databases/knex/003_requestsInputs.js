export const seed = knex => {
  return knex("requests_inputs")
    .then(function () {
      return knex("requests_inputs").insert([
        {
          provider: "SERTIC",
          month: "MAR",
          year: "2022",
          request_value: "5000",
          store: "31"
        }
      ])
    })
}
