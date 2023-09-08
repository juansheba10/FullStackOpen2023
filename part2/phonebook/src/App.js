import React, { useState, useEffect } from 'react';
import personsServices from './personServices';


const App = () => {
  const [persons, setPersons] = useState([]); // Inicializamos con un array vacío
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
  const Person = ({ name, number, onDelete }) => {
    return (
      <li>
        {name} {number} <button onClick={onDelete}>Delete</button>
      </li>
    );
  };
  
  
  // Component Persons
  const Persons = ({ persons, onDelete }) => {
    return (
      <ul>
        {persons.map(person => (
          <Person 
            key={person.id} 
            name={person.name} 
            number={person.number} 
            onDelete={() => onDelete(person.id, person.name)} 
          />
        ))}
      </ul>
    );
  };
  
  useEffect(() => {
    console.log('effect');
    
    personsServices.getAll()
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data);
      })
      .catch(error => {
        console.error("Error fetching persons:", error);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === '' || newNumber === '') {
      alert("Please enter both name and number.");
      return;
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };

      // Aquí usamos el módulo para guardar en el backend
      personsServices.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error("Error adding person:", error);
        });
    }
  }

  const deletePersonHandler = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsServices
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          alert(`The person was already deleted from the server.`);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };
  

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Persons persons={filteredPersons} onDelete={deletePersonHandler} />
    </div>
  )
}

export default App;

