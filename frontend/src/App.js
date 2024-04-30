import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

function App() {
  const [cheeses, setCheeses] = useState([]);
  useEffect(() => {
    // Fetching cheese data from backend API
    axios.get('http://localhost:3001/cheeses')
        .then(res => setCheeses(res.data))
        .catch(err => console.error('Error fetching cheeses:', err));
}, []);
// Future Improvement:
// - Add CSS classes or integrate design libraries
// - Implement the update, delete, and add api, not just for the backend
return (
    <div>
        <h1>Welcome to PZ Cheeseria</h1>
        <ul>
            {cheeses.map(cheese => (
                <li key={cheese.id}>
                    <h3>{cheese.name}</h3>
                    <img src={`http://localhost:3001${cheese.image}`} alt={cheese.name} style={{ width: '250px', height: '250px' }} />
                    <p>Price: ${cheese.price} per kilo</p>
                    <p>Color: {cheese.color}</p>
                </li>
            ))}
        </ul>
    </div>
);
}

export default App;
