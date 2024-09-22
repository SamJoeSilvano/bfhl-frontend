import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonData);
      const res = await axios.post('http://127.0.0.1:5000/bfhl', parsedData);
      setResponseData(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input or server error');
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFilters([...filters, value]);
    } else {
      setFilters(filters.filter(f => f !== value));
    }
  };

  return (
    <div className="App">
      <h1>{responseData ? responseData.roll_number : 'BFHL Challenge'}</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder='Enter valid JSON'
        />
        <button type='submit'>Submit</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}

      {responseData && (
        <div>
          <h2>Filters</h2>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleFilterChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleFilterChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_lowercase"
              onChange={handleFilterChange}
            />
            Highest Lowercase Alphabet
          </label>

          <h3>Response Data</h3>
          <div>
            {filters.includes('numbers') && (
              <p>Numbers: {responseData.numbers.join(', ')}</p>
            )}
            {filters.includes('alphabets') && (
              <p>Alphabets: {responseData.alphabets.join(', ')}</p>
            )}
            {filters.includes('highest_lowercase') && responseData.highest_lowercase_alphabet.length > 0 && (
              <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet[0]}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

