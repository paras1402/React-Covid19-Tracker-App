import React, { useState, useEffect } from "react";
import "./App.css";

import { MenuItem, FormControl, Select } from "@material-ui/core";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  // const getCountries = async () => {
  //   const request = await fetch("https://disease.sh/v3/covid-19/countries");
  //   const data = await request.json();
  // };

  // const list = getCountries();
  // console.log(list);

  useEffect(() => {
    const getCountries = async () => {
      const request = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await request.json();
      const countryList = data.map((country) => {
        return {
          name: country.country,
          value: country.countryInfo.iso2,
        };
      });

      setCountries(countryList);
    };
    getCountries();
  }, []);

  const handler = async (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>

        <FormControl className="app__dropdown">
          <Select onChange={handler} variant="outlined" value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>

            {countries.map((country) => {
              return <MenuItem value={country.value}>{country.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
