import React, { useState, useEffect } from 'react';
import personsServices from './personServices';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]); // Inicializamos con un array vacío
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ message: null, type: 'error' });


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
  
    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson) {
      const shouldUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
  
      if (shouldUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personsServices.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            setNotification({
              message: 'Usuario agregado/actualizado exitosamente',
              type: 'success'
            });
            
            // Configura un temporizador para eliminar la notificación después de unos segundos
            setTimeout(() => {
              setNotification({ message: null });
            }, 5000); // Desaparece después de 5 segundos
            
          })
          .catch(error => {
            console.log('Error updating the number:', error);
            
            setNotification({
              message: 'Error al actualizar el usuario. Puede que el usuario ya haya sido eliminado.',
              type: 'error'
            });
            setTimeout(() => {
              setNotification({ message: null });
            }, 5000);
          });
          
      }
  
    } else {
      const newPerson = { name: newName, number: newNumber };
      personsServices.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setNotification({
            message: 'Usuario agregado/actualizado exitosamente',
            type: 'success'
          });
          
          // Configura un temporizador para eliminar la notificación después de unos segundos
          setTimeout(() => {
            setNotification({ message: null });
          }, 5000); // Desaparece después de 5 segundos
          
        })
        .catch(error => {
          console.log('Error adding the person:', error);
          
          setNotification({
            message: 'Error al agregar el usuario. Por favor intente de nuevo.',
            type: 'error'
          });
          setTimeout(() => {
            setNotification({ message: null });
          }, 5000);
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
          console.log(`Error deleting the person with id ${id}:`, error);
          
          setNotification({
            message: `Error al eliminar el usuario. Puede que el usuario ya haya sido eliminado.`,
            type: 'error'
          });
          setTimeout(() => {
            setNotification({ message: null });
          }, 5000);
        });
        
    }
  };
  

  const filteredPersons = persons.filter(person =>
    person.name && person.name.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <Notification message={notification.message} type={notification.type} />
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

