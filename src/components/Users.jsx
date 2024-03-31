import React, { useEffect, useState } from 'react';
import { createClient } from 'urql';
import '../App.css';

function Users() {
  const [userAuthenticateds, setUserAuthenticateds] = useState([]);
  const [inputId, setInputId] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  const QueryURL = "https://api.studio.thegraph.com/query/69141/final/v0.0.1";
  const client = createClient({
    url: QueryURL
  });
  
  const queryUsers = `
    {
      userAuthenticateds(first: 5) {
        blockNumber
        blockTimestamp
        id
        transactionHash
        userAddress
      }
    }
  `;
  
  const queryUserById = `
    query GetUser($id: String!) {
      userAuthenticated(id: $id) {
        blockNumber
        blockTimestamp
        transactionHash
        userAddress
      }
    }
  `;

  useEffect(() => {
    const getData = async () => {
      const { data } = await client.query(queryUsers).toPromise();
      console.log(data);
      setUserAuthenticateds(data.userAuthenticateds);
    };
    getData();
  }, [client, queryUsers]);

  const handleInputChange = (event) => {
    setInputId(event.target.value);
  };

  const handleQueryById = async () => {
    try {
      const { data } = await client.query(queryUserById, { id: inputId }).toPromise();
      if (data && data.userAuthenticated) {
        setUserDetails(data.userAuthenticated);
      } else {
        console.error("User authentication not found.");
        setUserDetails(null);
      }
    } catch (error) {
      console.error("Error fetching user authentication:", error);
      setUserDetails(null);
    }
  };

  return (
    <>
      <div className="container">
        <div className="section">
          <h1>Users Authentication Information</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Address</th>
                <th>Block Number</th>
                <th>Block Timestamp</th>
                <th>Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {userAuthenticateds.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userAddress}</td>
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
        <h1>Query User Authentication by ID</h1>
        <div>
          <input
            type="text"
            placeholder="Enter User Authentication ID"
            value={inputId}
            onChange={handleInputChange}
          />
          <button onClick={handleQueryById}>Query</button>
        </div>
        {userDetails && (
          <div className="user-details">
            <h2>User Authentication Details</h2>
            <p>ID: {userDetails.id}</p>
            <p>User Address: {userDetails.userAddress}</p>
            <p>Block Number: {userDetails.blockNumber}</p>
            <p>Block Timestamp: {userDetails.blockTimestamp}</p>
            <p>Transaction Hash: {userDetails.transactionHash}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;
