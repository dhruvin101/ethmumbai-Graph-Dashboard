import React, { useEffect, useState } from 'react';
import { createClient } from 'urql';
import '../App.css';

function Usersa() {
  const [userRegistereds, setUserRegistereds] = useState([]);
  const [inputId, setInputId] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  const QueryURL = "https://api.studio.thegraph.com/query/69141/final/v0.0.1";
  const client = createClient({
    url: QueryURL
  });

  const queryUsers = `
    {
      userRegistereds(first: 5) {
        aadharQRCode
        blockNumber
        blockTimestamp
        id
        name
        transactionHash
        userAddress
      }
    }
  `;

  const queryUserById = `
    query GetUser($id: String!) {
      userRegistered(id: $id) {
        aadharQRCode
        blockNumber
        blockTimestamp
        name
        transactionHash
        userAddress
      }
    }
  `;

  useEffect(() => {
    const getData = async () => {
      const { data } = await client.query(queryUsers).toPromise();
      console.log(data);
      setUserRegistereds(data.userRegistereds);
    };
    getData();
  }, [client, queryUsers]);

  const handleInputChange = (event) => {
    setInputId(event.target.value);
  };

  const handleQueryById = async () => {
    try {
      const { data } = await client.query(queryUserById, { id: inputId }).toPromise();
      if (data && data.userRegistered) {
        setUserDetails(data.userRegistered);
      } else {
        console.error("User not found.");
        setUserDetails(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUserDetails(null);
    }
  };

  return (
    <>
      <div className="container">
        <div className="section">
          <h1>Users Information</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Address</th>
                <th>Aadhar QR Code</th>
                <th>Name</th>
                <th>Block Number</th>
                <th>Block Timestamp</th>
                <th>Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {userRegistereds.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userAddress}</td>
                  <td>{user.aadharQRCode}</td>
                  <td>{user.name}</td>
                  <td>{user.blockNumber}</td>
                  <td>{user.blockTimestamp}</td>
                  <td>{user.transactionHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="section">
        <h1>Query User by ID</h1>
        <div>
          <input
            type="text"
            placeholder="Enter User ID"
            value={inputId}
            onChange={handleInputChange}
          />
          <button onClick={handleQueryById}>Query</button>
        </div>
        {userDetails && (
          <div className="user-details">
            <h2>User Details</h2>
            <p>ID: {userDetails.id}</p>
            <p>User Address: {userDetails.userAddress}</p>
            <p>Aadhar QR Code: {userDetails.aadharQRCode}</p>
            <p>Name: {userDetails.name}</p>
            <p>Block Number: {userDetails.blockNumber}</p>
            <p>Block Timestamp: {userDetails.blockTimestamp}</p>
            <p>Transaction Hash: {userDetails.transactionHash}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Usersa;
