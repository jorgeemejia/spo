import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState("");
  const [order, setOrder] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username: ", username);
    console.log("Password: ", password);
    axios.post('https://localhost:3001/login', {username, password})
      .then(response => {
        console.log(response.data.success)
        console.log(response.data.userPublic)
        if (response.data) {
          setShowForm(true);
        }
      })
      .catch(error => {
        console.log(error)
      })
  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    console.log("Order: ", order);
    const timestamp = new Date().toISOString();
    console.log("Timestamp: ", timestamp )
  };

  return (
    <div>
      {!showForm ? (
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
      ) : (
        <div>
          <h1>Welcome, {username}!</h1>
          <form onSubmit={handleSubmit2}>
            <label>
              Order:
              <input type="text" value={order} onChange={handleOrderChange}/>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginForm;


