import { hash } from "bcrypt"
const passwordOnildo = await hash("3145", 8)
const passwordAriel = await hash("3107", 8)

export const seed = knex => {
  return knex("users")
    .then(function () {
      return knex("users").insert([
        {
          user: 3145,
          password: passwordOnildo,
          name: "Onildo Gonçalves",
          role: "developer",
          permission: "all",
          activated: true,
          store: "31"
        },
        {
          user: 3107,
          password: passwordAriel,
          name: "Ariel Teles Yehezkel",
          role: "manager",
          permission: "goals.stores",
          activated: true,
          store: "31"
        },
      ])
    })
}
