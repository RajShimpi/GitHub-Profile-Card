import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
      setUserData(null);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <input type="text" placeholder="Enter GitHub username" value={username} onChange={(e) => setUsername(e.target.value)} required
          />
          <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg></button>
        </form>
        {userData && (
          <div className="card">
            <div className="avatar">
              <img src={userData.avatar_url} alt="Avatar" />
            </div>
            <div className="user-info">
              <h2>{userData.login}</h2>
              <p>Name: {userData.name || 'N/A'}</p>
              <p>Public Repos: {userData.public_repos}</p>
              <p>Public Gists: {userData.public_gists}</p>
              <p>Profile Created: {userData.created_at.slice(0, 10)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
