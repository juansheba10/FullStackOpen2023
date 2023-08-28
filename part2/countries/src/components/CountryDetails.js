import React from 'react';

const CountryDetail = ({ country }) => {
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
        </div>
    );
}

export default CountryDetail;
