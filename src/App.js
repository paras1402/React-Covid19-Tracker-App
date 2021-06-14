import React, { useState, useEffect } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox.js/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [displayCountry, setDisplayCountry] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);

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
      console.log(data);
      const countryList = data.map((country) => {
        return {
          name: country.country,
          value: country.countryInfo.iso2,
        };
      });

      setMapCountries(data);
      setTableData(data);
      setCountries(countryList);
    };
    getCountries();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setDisplayCountry(data);
      });
  }, []);

  const onCountryChange = async (e) => {
    setCountry(e.target.value);

    const url =
      e.target.value === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${e.target.value}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log([data.countryInfo.lat, data.countryInfo.long]);
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(5);
    setDisplayCountry(data);
  };

  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>

          <FormControl className="app__dropdown">
            <Select
              onChange={onCountryChange}
              variant="outlined"
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((country) => {
                return (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            total={`${displayCountry.cases} `}
            cases={`${displayCountry.todayCases} `}
          ></InfoBox>
          <InfoBox
            title="Recovered"
            total={`${displayCountry.recovered} `}
            cases={`${displayCountry.todayRecovered}`}
          ></InfoBox>
          <InfoBox
            title="Deaths"
            total={`${displayCountry.deaths}`}
            cases={`${displayCountry.todayDeaths} `}
          ></InfoBox>
        </div>

        {/* Map */}
        <Map
          // casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        {/* Table */}
        {/* Graph */}
        <CardContent>
          <div className="right__content">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}></Table>
            <div className="graph">
              <h3>WorldWide new Cases</h3>
              <LineGraph></LineGraph>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
