import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Cards';

const App = () => {

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => setCountries(data));
  },[])
    
    return (
      <div className = "Page">
      <div className="App-header">
        <h1>Countries of the World</h1>
      </div> 
      <div className = "Search">
          <h1>Search</h1>
      </div>
      <div className="Body">
        {countries.map(country => 
            <Card
              flag = {country.flag}
              name = {country.name} 
              capital = {country.capital}
              region = {country.region}
              population = {country.population}
            /> )
      }</div>
      </div>
     ) 
}

export default App;



