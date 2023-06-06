import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([ 
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchResult, setSearchResult] = useState("")

  const personObject = {
    name: newName,
    phone: newPhone,
  };

const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(p => p.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`);
      return false;
    }
setPersons(persons.concat(personObject));
    setNewName("")
    setNewPhone("")

  };


  const getFilteredNames = () => {
    if (!searchResult) return persons
    return persons.filter(person => person.name.toLowerCase().startsWith(searchResult.toLowerCase()))
  }

  const filteredNames = getFilteredNames()

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
      <div>
      filter starts with: <input value={searchResult} onChange={handleSearch} />
      </div>
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameAddition} />
          <div>number: <input value={newPhone} onChange={handlePhoneAddition}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredNames.map((person) => (
          <li key={person.name}>{person.name} {person.phone}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
