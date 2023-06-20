import { useState, useEffect } from "react";
import axios from "axios";






const App = () => {
  const [value, setValue] = useState("");
  const [info, setInfo] = useState({});
  const [country, setCountry] = useState(null);
  const [error, setError] = useState("")


useEffect(() => {
    // skip if currency is not defined
    if (country) {
      console.log("fetching country info...");
      axios
        .get(`https://restcountries.com/v3/name/${country}`)
        .then((response) => {
          if (response.data.length > 10) {
            error = "too many matches, specify another filter"
            setError(error)
          } else {
            setInfo(response.data);
            console.log(response.data)
          }
        });
    }
  }, [country]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setCountry(value);
  };



  return (
    <div>
      <form onSubmit={onSearch}>
        find countries: <input value={value} onChange={handleChange} />
        <button type="submit">search</button>
      </form>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </div>
  );
};

export default App;
