import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Cards';
import Modal from './Modal';

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const App = () => {
  
  const [populationRangeFrom, setPopulationRangeFrom] = useState(null);
  const [populationRangeTo, setPopulationRangeTo] = useState(null);
  const [continents, setContinents] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountryName, setSelectedCountryName] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(countries);
  const [show, setShow] = useState(false);
  const [searchedValue, setSearchedValue ] = useState('');
  const [continentFilter, setContinentFilter] = useState('');

  const handleInputFilterChange =(value)=>{ 
    setSearchedValue(value);
  }

  const getDistinctContinents = () => {
    const distinctContinents= initialData.map(x=>x.region).filter(onlyUnique)
    setContinents(distinctContinents);
  }

  const filterByPopulationRange = () => { 
    const filterData = initialData.filter(country => country.population > populationRangeFrom && country.population < populationRangeTo)
    setCountries(filterData);
  }

  useEffect(() => {
    let filteredData;
    if (continentFilter){
      filteredData = initialData.filter(country => country.region.toLowerCase() === continents[continentFilter].toLowerCase());
    }
    setCountries(filteredData);
  },[continentFilter])

  useEffect(() => {
    const filterData = initialData.filter(country => country.name.toLowerCase().includes(searchedValue.toLowerCase())
          || country.capital.toLowerCase().includes(searchedValue.toLowerCase())
          || country.alpha2Code.toLowerCase().includes(searchedValue.toLowerCase())
          || country.alpha3Code.toLowerCase().includes(searchedValue.toLowerCase()));
    setCountries(filterData);
  },[searchedValue])

  useEffect(() => {
    getDistinctContinents();
  },[initialData])

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/name/'+selectedCountryName)
      .then(response => response.json())
      .then(data => setSelectedCountry(data));
  },[selectedCountryName])

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {setCountries(data) ; setInitialData(data)});
  },[])

    
    return (
      <div className = "Page">
        {selectedCountry[0] &&
          <Modal 
          onClose={() => setShow(false)} show={show} 
          flag = {selectedCountry[0].flag}
          name = {selectedCountry[0].name}
          alpha2code = {selectedCountry[0].alpha2Code}
          capital = {selectedCountry[0].capital}
          region = {selectedCountry[0].region}
          population = {selectedCountry[0].population}
          latlng = {selectedCountry[0].latlng}
          area = {selectedCountry[0].area}
          timezone = {selectedCountry[0].timezones} 
          borders = {selectedCountry[0].borders}
          currencies = {selectedCountry[0].currencies}
          languages = {selectedCountry[0].languages}
          />} 
      <div className="Header">
        <h1>Countries of the World</h1>
        <input className="Search-box" type="text" placeholder=" Search by name, code or capital..." onChange={(e)=>{handleInputFilterChange(e.target.value)}} />
      </div> 
      <div id="filter1" className = "Filter">
        <span className ="FilterBy">Filter by continent: </span>
        <select name="subject" className="Select" onChange={(e) => {setContinentFilter(e.target.value)}}>
        {continents && continents.map((text,i) => (
                <option value={i} selected={text}>
                    {text}
                </option>
            ))}
        </select>
        <div id="filter2" >
          <span className ="FilterBy">Filter by population range: </span>
          <input className="Select" type="text" onChange = {(e) => {setPopulationRangeFrom(e.target.value)}}></input>
          to
          <input className="Select" type="text" onChange = {(e) => {setPopulationRangeTo(e.target.value)}}></input>
          <button className="FilterButton" onClick = {() => filterByPopulationRange()}>Filter</button>
        </div>
        </div>
      <div className="Body">
      {countries.map(country => 
            <Card 
            setSelectedCountryName={setSelectedCountryName}
            flag = {country.flag}
            name = {country.name} 
            capital = {country.capital}
            region = {country.region}
            population = {country.population}
            setShow = {setShow}
          />
          )}
      
      </div>
      </div>
     ) 
}

export default App;



