import { useState, useEffect } from "react";
import axios from 'axios'
import addressService from './services/addresses'

const Filter = ({searchResult, handleSearch}) => {
  return (
  <div>
  filter starts with: <input value={searchResult} onChange={handleSearch} />
  </div>)
}

const Persons = ({persons, searchResult, removePerson}) => {
  const getFilteredNames = () => {
    if (!searchResult) return persons
    return persons.filter(person => person.name.toLowerCase().startsWith(searchResult.toLowerCase()))
  }

  const filteredNames = getFilteredNames()
  return (
    <ul>
    {filteredNames.map((person) => (
      <li key={person.name}>
        {person.name} {person.phone}
        <button onClick={(event) => removePerson(event, person.id)}>remove</button>      </li>
    ))}
  </ul>
  )
}

const PersonForm = ({addPerson, newName, handleNameAddition, handlePhoneAddition, newPhone}) => {
  return (
    <div>
    <form onSubmit={addPerson}>
       <div>
         name: <input value={newName} onChange={handleNameAddition} />
         <div>number: <input value={newPhone} onChange={handlePhoneAddition}/></div>
       </div>
       <div>
         <button type="submit">add</button>
       </div>
     </form>  
     </div>    
  )
}


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchResult, setSearchResult] = useState("")

  useEffect(() => {
    addressService
    .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])

  const personObject = {
    name: newName,
    phone: newPhone,
  };

const addPerson = (event) => {
  event.preventDefault();
  if (persons.find(p => p.name === newName)) {
    window.alert(`${newName} is already added to the phonebook`)
  } else {
    addressService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName("")
      setNewPhone("")
    })
  }
}

const removePerson = (event, id) => {
  event.preventDefault();
  addressService.remove(id)
  .then(() => {
    setPersons(persons.filter(person => person.id !== id));
  });
}

  
  const handleNameAddition = (event) => {
    setNewName(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchResult(event.target.value);
  };

  const handlePhoneAddition = (event) => {
    setNewPhone(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
<Filter searchResult={searchResult} handleSearch={handleSearch}/>
      <h3>add new</h3>
<PersonForm addPerson={addPerson} newName={newName} handleNameAddition={handleNameAddition} handlePhoneAddition={handlePhoneAddition} newPhone={newPhone} /> 
      <h3>Numbers</h3>
<Persons persons={persons} searchResult={searchResult} removePerson={removePerson}/>
    </div>
  );
};

export default App;
