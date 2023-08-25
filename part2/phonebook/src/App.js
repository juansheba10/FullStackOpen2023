import React, { useState } from 'react'

// Component Filter
const Filter = ({ value, onChange }) => {
  return (
    <div>
      Filter shown with: <input value={value} onChange={onChange} />
    </div>
  )
}

// Component PersonForm
const PersonForm = ({ onSubmit, nameValue, numberValue, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

// Component Person
const Person = ({ name, number }) => {
  return (
    <li>{name} {number}</li>
  )
}

// Component Persons
const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person, index) => 
        <Person key={index} name={person.name} number={person.number} />
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') {
      alert("Please enter both name and number.")
      return
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson} 
        nameValue={newName} 
        numberValue={newNumber} 
        onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
