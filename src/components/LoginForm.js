import React, { useState } from "react";
import axios from "axios";
import forge from "node-forge";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState("");
  const [order, setOrder] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [jwt, setJwt] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  }

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username: ", username);
    console.log("Password: ", password);
    axios.post('https://localhost:3001/login', {username, password})
      .then(response => {
        console.log('Response: ', response.data.success);
        console.log("User's Public Key: ", response.data.userPublic);
        console.log("JWT Token: ", response.data.jwt);
        setJwt(response.data.jwt);
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
    const timestamp = new Date().toISOString();
    const pk = forge.pki.privateKeyFromPem(privateKey);
    const md = forge.md.sha256.create();
    md.update(order, 'utf8');
    console.log("Transformed Order: ", md.digest().toHex());


    const signature = pk.sign(md, 'RSASSA-PKCS1-V1_5', { md: forge.md.sha256.create() }); // Use the padded value for signing
    const signatureBase64 = forge.util.encode64(signature);

    console.log("timestamp: ", timestamp)
    console.log("privateKey: ", privateKey)
    console.log("signature: ", signature)
    console.log("signatureBase64: ", signatureBase64)
    console.log("jwt: ", jwt)
    console.log("order: ", order)
  
    const headers = {
      Authorization: `Bearer ${jwt}`, // Include the JWT token in the Authorization header
    };
  
    const data = {
      order: order,
      timestamp: timestamp,
      signature: signatureBase64, // Include the Base64-encoded signature
    };
  
    axios
      .post("https://localhost:3001/order", data, { headers })
      .then((response) => {
        // Handle the response
        console.log('Response:', response.data.success);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <h2>JWT: {jwt}</h2>
          <form onSubmit={handleSubmit2}>
            <label>
              Order:
              <input type="text" value={order} onChange={handleOrderChange}/>
            </label>
            <label>
              Private Key:
              <input type="text" value={privateKey} onChange={handlePrivateKeyChange}/>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginForm;


