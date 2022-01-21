export const seed = knex => {
  return knex("notes")
    .then(function () {
      return knex("notes").insert([
        {
          access_key: "35211260840691000163550010003073361583776270",
          cnpj: "60.840.691/0001-63",
          value: "13962.13",
          nf: "307336",
          issue: "2022-01-13",
          provider: "Comercio e Importacao Sertic Ltda.",
          store: "31"
        }
      ])
    })
}
