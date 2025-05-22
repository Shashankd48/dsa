import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [newWord, setNewWord] = useState('');

  useEffect(() => {
    if (!query) return setSuggestions([]);
    const timeout = setTimeout(() => {
      axios.get(`http://localhost:5000/search?q=${query}`)
        .then(res => setSuggestions(res.data.results))
        .catch(console.error);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleAdd = async () => {
    if (!newWord) return;
    try {
      await axios.post('http://localhost:5000/add', { text: newWord });
      alert('Word added!');
      setNewWord('');
    } catch (e) {
      alert('Error adding word.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search prefix..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {suggestions.map((word, idx) => <li key={idx}>{word}</li>)}
      </ul>
      <hr />
      <input
        type="text"
        placeholder="Add new word"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default SearchBox;
