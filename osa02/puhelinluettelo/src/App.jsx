import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '050-1234567'
     },
     { name: 'Ada Lovelace', 
      number: '39-44-5323523' 
      },
    { name: 'Dan Abramov', 
      number: '12-43-234345' 
    },
    { name: 'Mary Poppendieck', 
      number: '39-23-6423122' 
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName= (event) => {    
    event.preventDefault()    
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if ( persons.find(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook.`)
      return
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
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
      <h3>filter shown with:</h3>
      <input
      value={filter}
      onChange={handleFilterChange} 
      />
      <h2>Add new name and number</h2>
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
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>      
    </div>
    
  )

}

export default App
