import { hash } from "bcrypt"
const passwordHash = await hash("759466", 8)

export const seed = knex => {
  return knex("users").del()
    .then(function () {
      return knex("users").insert([
        {
          user: 3145,
          password: passwordHash,
          name: "Onildo Gonçalves",
          role: "developer",
          activated: true,
          store: "31"
        }
      ])
    })
}
