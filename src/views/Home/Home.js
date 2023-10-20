import React, { useEffect, useState } from 'react'
import './Home.css'
import weather from './img/weather.png'
import axios from 'axios'

function Home() {

    const [query, setQuery] = useState('solapur');
    const [temp, setTemp] = useState('50')
    const [windSpeed, setWind] = useState('4.5')
    const [error, setMsg] = useState('Valid city name')
    const [cityName, setCityName] = useState('Soalpur')

    const loadWeather = async () => {
       try{
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${query}&appid=${process.env.REACT_APP_API_KEY}`)

        setWind(response.data.wind.speed)
        setTemp(response.data.main.temp)
        setCityName(response.data.name)
        setMsg('Valid city name')
       }
       catch(error){
        setMsg('Invalid city name')
       }
    }

    useEffect(() => {
        loadWeather()
    }, [])

    useEffect(() => {
        loadWeather()
    }, [query])

    return (
        <div>
            <div className='card'>
                <div className='search'>
                    <input type="text"
                        placeholder="Enter city name.."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }} />
                </div>

                <p className='error-msg'>{error}</p>
                <h1 className='city-name'>{cityName}</h1>
                <img src={weather} className='weather-img' alt='WeatherImg' />
                <div className='display-container'>
                    <div>
                        <p>{temp} <sup>o</sup>C</p>
                        <p>Temperature</p>
                    </div>
                    <div>
                        <p>{windSpeed} Km/hr<sup></sup></p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
