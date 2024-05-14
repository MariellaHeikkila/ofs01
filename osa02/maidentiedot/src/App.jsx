import { useEffect } from 'react'
import { useState } from 'react'

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')  

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
  }
 
  const countriesToShow = filter 
  ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  : countries


  return (
    <>
    <Filter filter={filter} handleFilterChange={handleFilterChange} />
    {countriesToShow.length > 10 ?
      <p>Too many matches, specify another letter</p>
      :
      <Countries countriesToShow={countriesToShow} />}
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

const Countries = ({countriesToShow}) => {
  return (
    <ul>
      {countriesToShow.map(country =>
        countriesToShow.length === 1 ?
        <div key={country.name.common}>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
          <h2>Languages:</h2>
          <ul>
            {Object.values(country.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common} width='150px' height='150px'/>
        </div>
        :
        <p key={country.name.common}>
          {country.name.common}
          </p>
      )}
      
    </ul>
  )
}
