export const seed = knex => {
  return knex("notes")
    .then(function () {
      return knex("notes").insert([
        {
          access_key: "42220173827982000325550010000438081073114123",
          cnpj: "73.827.982/0003-25",
          value: "360.44",
          nf: "43808",
          issue: "2022-01-14",
          provider: "SUMMIT COMERCIO IMP. E EXP LTDA",
          store: "31"
        }
      ])
    })
}
