import React from 'react';

const Search = ({ query, setQuery }) => {
    return (
        <div>
            Find countries: <input value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
    );
}

export default Search;
