const express = require('express')
const app = express()
app.use(express.json());


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

  app.get('/info', (req, res) => {
    const date = new Date()
    const content = `
        <h1>fullstack content</h1>
        <p>${date}</p>
        <p>The Phonebook has info for ${persons.length} persons</p>
    `;

    res.send(content);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id) // Convertir el ID a número ya que viene como string
  const person = persons.find(p => p.id === id)

  if (person) {  // Si se encuentra la persona, se devuelve.
      res.json(person)
  } else {  // Si no se encuentra, se devuelve un error 404.
      res.status(404).send('<h2>Persona no encontrada</h2>')
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id); // Convertir el ID a número ya que viene como string
  persons = persons.filter(p => p.id !== id); // Filtra y elimina la persona con el ID especificado

  res.status(204).end(); // 204 No Content: indica que la operación fue exitosa pero no se está enviando contenido en la respuesta
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
      return res.status(400).json({ 
          error: 'name or number missing' 
      });
  }

  const personExists = persons.some(person => person.name === body.name);
  if (personExists) {
      return res.status(400).json({ 
          error: 'name must be unique' 
      });
  }

  const newPerson = {
      id: Math.floor(Math.random() * 1000000), 
      name: body.name,
      number: body.number
  };

  persons.push(newPerson);

  res.json(newPerson);
});


  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })