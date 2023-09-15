const express = require('express')
const app = express()

let persons = [
    {
        id: 1,
        name: "Jose Mar",
        number: "999-222-333",
    },
    {
        id: 2,
        name: "Miguel Kim",
        number: "192-333-22"
    },
    {
        id: 3,
        name: "Luis Lopez",
        number: "201-33-222",
    },
    {
        id: 4,
        name: "Pedro Perez",
        number: "665-555-555",
      },
]
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })