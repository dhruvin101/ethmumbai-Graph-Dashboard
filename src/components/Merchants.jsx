import React, { useEffect, useState } from 'react';
import { createClient } from 'urql';
import '../App.css';

function Merchants() {
  const [merchantRegistereds, setMerchantRegistereds] = useState([]);
  const [inputId, setInputId] = useState('');
  const [merchantDetails, setMerchantDetails] = useState(null);

  const QueryURL = "https://api.studio.thegraph.com/query/69141/final/v0.0.1";
  const client = createClient({
    url: QueryURL
  });
  
  const queryMerchants = `
    {
      merchantRegistereds(first: 10) {
        id
        merchantAddress
        merchantIdentifier
        name
        blockTimestamp
        blockNumber
        transactionHash
      }
    }
  `;
  
  const queryMerchantById = `
    query GetMerchant($id: String!) {
      merchantRegistered(id: $id) {
        id
        merchantAddress
        merchantIdentifier
        name
        blockTimestamp
        blockNumber
        transactionHash
      }
    }
  `;

  useEffect(() => {
    const getData = async () => {
      const { data } = await client.query(queryMerchants).toPromise();
      console.log(data);
      setMerchantRegistereds(data.merchantRegistereds);
    };
    getData();
  }, [client, queryMerchants]);

  const handleInputChange = (event) => {
    setInputId(event.target.value);
  };

  const handleQueryById = async () => {
    try {
      const { data } = await client.query(queryMerchantById, { id: inputId }).toPromise();
      if (data && data.merchantRegistered) {
        setMerchantDetails(data.merchantRegistered);
      } else {
        console.error("Merchant not found.");
        setMerchantDetails(null);
      }
    } catch (error) {
      console.error("Error fetching merchant:", error);
      setMerchantDetails(null);
    }
  };

  return (
    <>
      <div className="container">
        <div className="section">
          <h1>Merchants Information</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Merchant Address</th>
                <th>Merchant Identifier</th>
                <th>Name</th>
                <th>Block Number</th>
                <th>Block Timestamp</th>
                <th>Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {merchantRegistereds.map(merchant => (
                <tr key={merchant.id}>
                  <td>{merchant.id}</td>
                  <td>{merchant.merchantAddress}</td>
                  <td>{merchant.merchantIdentifier}</td>
                  <td>{merchant.name}</td>
                  <td>{merchant.blockNumber}</td>
                  <td>{merchant.blockTimestamp}</td>
                  <td>{merchant.transactionHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="section">
        <h1>Query Merchant by ID</h1>
        <div>
          <input
            type="text"
            placeholder="Enter Merchant ID"
            value={inputId}
            onChange={handleInputChange}
          />
          <button onClick={handleQueryById}>Query</button>
        </div>
        {merchantDetails && (
          <div className="merchant-details">
            <h2>Merchant Details</h2>
            <p>ID: {merchantDetails.id}</p>
            <p>Merchant Address: {merchantDetails.merchantAddress}</p>
            <p>Merchant Identifier: {merchantDetails.merchantIdentifier}</p>
            <p>Name: {merchantDetails.name}</p>
            <p>Block Number: {merchantDetails.blockNumber}</p>
            <p>Block Timestamp: {merchantDetails.blockTimestamp}</p>
            <p>Transaction Hash: {merchantDetails.transactionHash}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Merchants;
