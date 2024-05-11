import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons =>{
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }  , [])

  const addName= (event) => {    
    event.preventDefault()    
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const personAlreadyExists = persons.find(person => person.name === newName)

    if (personAlreadyExists) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...personAlreadyExists, number: newNumber}
        personService
        .update(personAlreadyExists.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personAlreadyExists.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deleteName = (id) => {
     console.log('delete button clicked', id);
      const person = persons.find(person => person.id === id)
      if (window.confirm(`Delete ${person.name} ?`)) {
        personService
          .deletePerson(id)
          .then(response => {
            setPersons(persons.filter(person => person.id !== id))
          })
      }
  }

  const updateName = (id) => {
    const person = persons.find(person => person.id === id)
    const changedPerson = { ...person, number: newNumber}
    if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
    personService
    .update(id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
    })
  }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
 
  const personsToShow = filter 
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new name and number</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteName={deleteName}/>    
    </div>    
  )
}

export default App

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      <h3>filter shown with:</h3>
      <input
      value={filter}
      onChange={handleFilterChange} 
      />
    </div>
  )
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input 
              value={newName}
              onChange={handleNameChange}
              />
      </div>
      <div>
        number: <input 
              value={newNumber}
              onChange={handleNumberChange}
              />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow, deleteName}) => {
  return (
    <ul>
      {personsToShow.map(person =>
          <li key={person.name}>{person.name} {person.number}
          <button onClick={() => deleteName(person.id)}>delete</button>
          </li>
      )}
      
    </ul>
  )
}