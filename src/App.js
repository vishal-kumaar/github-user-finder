import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        setData(null);
      });
  };
  return (
    <>
      <div className="form-area">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter User Name"
            id="username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
          <button id="submit" type="submit">
            Get Data
          </button>
        </form>
      </div>
      <div id="user">
        {data ? (
          <>
            <img src={data.avatar_url} alt="profile-pic" />
            <div className="details">
              <div className="column1">
                <div className="detail clamped-text">
                  <p>Name: {data.name}</p>
                </div>
                <div className="detail clamped-text">
                  <p>Location: {data.location}</p>
                </div>
                <div className="detail">
                  <p>Followers: {data.followers}</p>
                </div>
              </div>
              <div className="column2">
                <div className="detail">
                  <span> Portfolio: </span>
                  <a href={data.html_url} target="_blank" rel="noreferrer">
                    Portfolio
                  </a>
                </div>
                <div className="detail">
                  <p>Public Repos: {data.public_repos}</p>
                </div>
                <div className="detail">
                  <p className="clamped-text">Bio: {data.bio}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="instruction">Search any user to see result here.</div>
        )}
      </div>
    </>
  );
}

export default App;
