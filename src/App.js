import './App.css';
import LoginForm from './components/LoginForm';
import OrderForm from './components/OrderForm';
import React, { useState } from "react";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [jwt, setJwt] = useState("");
  const [username, setUsername] = useState("");


  return (
    <div className="App">
      <h1>Secure Purchase Order</h1>
      {!signedIn ? (
        <LoginForm setJwt={setJwt} setsignedIn={setSignedIn} setUsername={setUsername}/>
      ) : (
        <OrderForm jwt={jwt} username={username}/>
      )}
    </div>
  );
}

export default App;
