import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = "https://api.openweathermap.org/data/2.5/weather?"
const API_KEY = import.meta.env.VITE_SOME_KEY
const ICON_URL  = "https://openweathermap.org/img/wn/"

export default function Weather({lat, lng, city}) {

const [temp, setTemp] = useState(0)
const [icon, setIcon] = useState('')
const [wind, setWind] = useState(0)

useEffect(() => {
    const address = API_URL +
    'lat=' + lat + 
    '&lon=' + lng +
    '&units=metric' + 
    '&appid=' + API_KEY

    axios.get(address)
    .then((response) => {
        setTemp(response.data.main.temp)
        setIcon(ICON_URL + response.data.weather[0].icon + '@4x.png')
        setWind(response.data.wind.speed)
    }).catch (error => {
        alert(error)
    })
}, [lat, lng])

  return (
    <div><p>Weather in {city}</p>
    <p>Temperature: {temp} celcius</p>
    <img src={icon} alt=""/>
    <p>Wind: {wind} m/s</p>
    </div>
  )
}
