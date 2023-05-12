import React, { useState } from "react";
import axios from "axios";

function LoginForm({setJwt, setsignedIn, setUsername}) {
  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsernameInput(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://localhost:3001/login', {username, password})
      .then(response => {
        setJwt(response.data.jwt);
        setsignedIn(true);
        setUsername(username);
      })
      .catch(error => {
        console.log(error)
      })
  };
  
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default LoginForm;


