export const seed = knex => {
  return knex("goals")
    .then(function () {
      return knex("goals").insert([
        {
          goal: '11000',
          sector: 'livraria',
          month: 'FEV',
          year: '2021',
          store: '69',
        },
        {
          goal: '10000',
          sector: 'livraria',
          month: 'MAR',
          year: '2021',
          store: '69',
        },
        {
          goal: '10000',
          sector: 'livraria',
          month: 'ABR',
          year: '2021',
          store: '69',
        },
        {
          goal: '10000',
          sector: 'livraria',
          month: 'MAI',
          year: '2021',
          store: '69',
        },
        {
          goal: '10000',
          sector: 'livraria',
          month: 'JUN',
          year: '2021',
          store: '69',
        },
        {
          goal: '10000',
          sector: 'livraria',
          month: 'JUL',
          year: '2021',
          store: '69',
        },
        {
          goal: '10000',
          sector: 'livraria',
          month: 'AGO',
          year: '2021',
          store: '69',
        },
        {
          goal: '10000',
          sector: 'livraria',
          month: 'SET',
          year: '2021',
          store: '69',
        },
        {
          goal: '10000',
          sector: 'livraria',
          month: 'OUT',
          year: '2021',
          store: '69',
        },
        {
          goal: '10000',
          sector: 'livraria',
          month: 'NOV',
          year: '2021',
          store: '69',
        },
        {
          goal: '10000',
          sector: 'livraria',
          month: 'DEZ',
          year: '2021',
          store: '69',
        },
        {
          goal: '10000',
          sector: 'livraria',
          month: 'JAN',
          year: '2021',
          store: '69',
        }
      ])
    })
}
