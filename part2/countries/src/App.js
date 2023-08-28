import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetails';

const App = () => {
    const [query, setQuery] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        if (query.length === 0) return;
        
        fetch(`https://restcountries.com/v3.1/name/${query}`)
            .then(response => response.json())
            .then(data => {
                setCountries(data);
                if (data.length === 1) setSelectedCountry(data[0]);
                else setSelectedCountry(null);
            });
    }, [query]);

    return (
        <div>
            <Search query={query} setQuery={setQuery} />
            {selectedCountry ? <CountryDetail country={selectedCountry} /> : <CountryList countries={countries} selectCountry={setSelectedCountry} />}
        </div>
    );
}

export default App;
