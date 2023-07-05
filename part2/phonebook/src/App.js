import { useState, useEffect } from "react";
import addressService from "./services/addresses";
import "./index.css";

const Filter = ({ searchResult, handleSearch }) => {
  return (
    <div>
      filter starts with: <input value={searchResult} onChange={handleSearch} />
    </div>
  );
};

const Persons = ({ persons, searchResult, removePerson }) => {
  const getFilteredNames = () => {
    if (!searchResult) return persons;
    return persons.filter((person) =>
      person.name.toLowerCase().startsWith(searchResult.toLowerCase())
    );
  };

  const filteredNames = getFilteredNames();
  return (
    <ul>
      {filteredNames.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button
            onClick={(event) => {
              let check = window.confirm(`Delete ${person.name}?`);
              if (check) {
                removePerson(event, person.id);
              }
              return;
            }}
          >
            remove
          </button>
        </li>
      ))}
    </ul>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleNameAddition,
  handlePhoneAddition,
  newPhone,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameAddition} />
          <div>
            number: <input value={newPhone} onChange={handlePhoneAddition} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Notification = ({ message }) => {
  return <div className="message">{message}</div>;
};

const Error = ({ message }) => {
  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    addressService.getAll().then((initialPhonebook) => {
      setPersons(initialPhonebook);
    });
  }, []);

  const removePerson = (event, id) => {
    addressService.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const handleNameAddition = (event) => {
    setNewName(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchResult(event.target.value);
  };

  const handlePhoneAddition = (event) => {
    setNewPhone(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName || !newPhone) {
      // Handle the case when name or phone is empty
      return;
    }

    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the old number with the new one?`
        )
      ) {
        const updatedPerson = {
          ...existingPerson,
          number: newPhone,
        };
        addressService
          .update(existingPerson.id, updatedPerson)
          .then(() => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewPhone("");
          })
          .then(() => {
            setNotification(`Updated ${newName}`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setError(
              `Information of ${newName} has already been removed from the server`
            );
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
      };
      addressService
        .create(personObject)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNewName("");
          setNewPhone("");
        })
        .then(() => {
          setNotification(`Added ${newName}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setError(error.response.data.error);
          
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter searchResult={searchResult} handleSearch={handleSearch} />
      <h3>add new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameAddition={handleNameAddition}
        handlePhoneAddition={handlePhoneAddition}
        newPhone={newPhone}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchResult={searchResult}
        removePerson={removePerson}
      />
    </div>
  );
};
export default App;
