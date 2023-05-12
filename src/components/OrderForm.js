import React, { useState } from "react";
import axios from "axios";
import forge from "node-forge";

function OrderForm({jwt, username}) {
  const [order, setOrder] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  }

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const timestamp = new Date().toISOString();
    const pk = forge.pki.privateKeyFromPem(privateKey);
    const md = forge.md.sha256.create();
    md.update(order, 'utf8');
    const signature = pk.sign(md, 'RSASSA-PKCS1-V1_5', { md: forge.md.sha256.create() });
    const signatureBase64 = forge.util.encode64(signature);
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
    const data = {
      order: order,
      timestamp: timestamp,
      signature: signatureBase64,
    };
    axios
      .post("https://localhost:3001/order", data, { headers })
      .then((response) => {
        console.log('Response: ', response.data.success);
        console.log('Order status: ', response.data.order_status)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
        <div>
          <h2>Welcome, {username}!</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Order:
              <input type="text" value={order} onChange={handleOrderChange}/>
            </label>
            <label>
              Private Key:
              <input type="text" value={privateKey} onChange={handlePrivateKeyChange}/>
            </label>
            <button type="submit">Submit with RSA Digital Signature</button>
          </form>
        </div>
    );
}

export default OrderForm;