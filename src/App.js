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
import { prettyPrintStat } from "./utils/utils";
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

    if (e.target.value === "worldwide") {
      setMapCenter([40.52, 34.34]);
      setMapZoom(1.45);
    } else {
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(5);
    }

    setDisplayCountry(data);
  };

  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <div className="heading">
            <h1>Covid-19 Tracker</h1>
            <img className="icon" src="covid.png" alt=""></img>
          </div>

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
            isRed={true}
            active={casesType === "cases"}
            onClick={(e) => {
              setCasesType("cases");
            }}
            title="Coronavirus Cases"
            total={prettyPrintStat(displayCountry.cases)}
            cases={prettyPrintStat(displayCountry.todayCases)}
          ></InfoBox>
          <InfoBox
            isGreen={true}
            active={casesType === "recovered"}
            onClick={(e) => {
              setCasesType("recovered");
            }}
            title="Recovered"
            total={prettyPrintStat(displayCountry.recovered)}
            cases={prettyPrintStat(displayCountry.todayRecovered)}
          ></InfoBox>
          <InfoBox
            isRed={true}
            active={casesType === "deaths"}
            onClick={(e) => {
              setCasesType("deaths");
            }}
            title="Deaths"
            total={prettyPrintStat(displayCountry.deaths)}
            cases={prettyPrintStat(displayCountry.todayDeaths)}
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
        <CardContent>
          <div className="right__content">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}></Table>
            <div className="graph">
              <h3 style={{ marginBottom: ".9rem" }}>
                WorldWide new {casesType}
              </h3>
              <LineGraph casesType={casesType}></LineGraph>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
