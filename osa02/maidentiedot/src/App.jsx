import { useEffect, useState } from 'react'
import Weather from './Weather'

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [currentCountry, setCurrentCountry] = useState('')
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)

  useEffect(() => {

    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

    fetch(url)
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.log(err))

  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setCurrentCountry('')
  }

  const countriesToShow = filter 
  ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  : countries

  const handleShow = (country) => {
    setCurrentCountry(country)
    setLat(country.latlng[0])
    setLng(country.latlng[1])
  }

  return (
    <>
    <Filter filter={filter} handleFilterChange={handleFilterChange} />
    {countriesToShow.length > 10 ?
      <p>Too many matches, specify another letter</p>
      :
      <Countries countriesToShow={countriesToShow} handleShow={handleShow} currentCountry={currentCountry} lat={lat} lng={lng}/>}
      
    </>
  )
}

export default App

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      <h3>Find Countries:</h3>
      <input
      value={filter}
      onChange={handleFilterChange} 
      />
    </div>
  )
}

const Countries = ({countriesToShow, handleShow, currentCountry, lat, lng}) => {
  
  return (
    <div>
    {countriesToShow.length === 1 ? (
      <CountryDetails country={countriesToShow[0]} lat={lat} lng={lng}/>
    ) : currentCountry ? (
      <CountryDetails country={currentCountry} lat={lat} lng={lng}/>
    ) : (
      <ul>
        {countriesToShow.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => handleShow(country)}>show</button>
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}

const CountryDetails = ({ country, lat, lng }) => {
  return (
  <div key={country.name.common}>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area}</p>
    <h2>Languages:</h2>
    <ul>
      {Object.values(country.languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </ul>
    <img
      src={country.flags.png}
      alt={country.name.common}
      width="150px"
      height="150px"
    />
    <Weather lat={lat} lng={lng} city={country.capital[0]}/>
  </div>  
  )
}