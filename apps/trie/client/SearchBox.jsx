import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      const res = await axios.get(`http://localhost:5000/search?q=${query}`);
      setSuggestions(res.data.results);
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search words..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((word, idx) => <li key={idx}>{word}</li>)}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
