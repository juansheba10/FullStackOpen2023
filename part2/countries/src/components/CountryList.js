import React from 'react';

const CountryList = ({ countries, selectCountry }) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>;
    }
    return (
        <div>
            {countries.map(country => (
                <div key={country.name.common}>
                    {country.name.common} <button onClick={() => selectCountry(country)}>show</button>
                </div>
            ))}
        </div>
    );
}

export default CountryList;
