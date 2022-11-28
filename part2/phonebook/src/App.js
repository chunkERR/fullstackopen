import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  
  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const allNames = persons.map(person => person.newName)

if (allNames.includes({newName})) {
 alert(`${newName} is already added to phonebook`)
}

    setPersons(persons.concat({newName}))
    setNewName('')
    console.log(persons)
  }

  const eventChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={eventChange}/>
        </div>
        <div>debug: {newName}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => <li key={i}>{person.newName}</li>)}
      </ul>
    </div>
  )
}

export default App