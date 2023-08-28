import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetail = ({ country }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (country) {
            const apiKey = process.env.REACT_APP_API_KEY; 
            const query = country.capital;
            
            axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${query}`)
                .then(response => {
                    setWeather(response.data.current);
                });
        }
    }, [country]);

    if (!country) return null;

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name}`} width="150" />
            
            {/* Mostrando el clima si está disponible */}
            {weather && (
                <div>
                    <h3>Weather in {country.capital}</h3>
                    <p><strong>Temperature:</strong> {weather.temperature}°C</p>
                    <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />
                    <p><strong>Wind:</strong> {weather.wind_speed} km/h direction {weather.wind_dir}</p>
                </div>
            )}
        </div>
    );
}

export default CountryDetail;
