export const seed = knex => {
  return knex("goals")
    .then(function () {
      return knex("goals").insert([
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'FEV',
          year: '2022',
          store: '31',
        },
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'MAR',
          year: '2022',
          store: '31',
        },
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'ABR',
          year: '2022',
          store: '31',
        },
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'MAI',
          year: '2022',
          store: '31',
        },
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'JUN',
          year: '2022',
          store: '31',
        },
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'JUL',
          year: '2022',
          store: '31',
        },
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'AGO',
          year: '2022',
          store: '31',
        },
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'SET',
          year: '2022',
          store: '31',
        },
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'OUT',
          year: '2022',
          store: '31',
        },
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'NOV',
          year: '2022',
          store: '31',
        },
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'DEZ',
          year: '2022',
          store: '31',
        },
        {
          goal: '10000',
          sector: 'volta as aulas',
          month: 'JAN',
          year: '2022',
          store: '31',
        }
      ])
    })
}
