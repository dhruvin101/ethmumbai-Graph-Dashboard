import React, { useEffect, useState } from 'react';
import { createClient } from 'urql';
import '../App.css';

function Departments() {
  const [departmentRegistereds, setDepartmentRegistereds] = useState([]);
  const [inputId, setInputId] = useState('');
  const [departmentDetails, setDepartmentDetails] = useState(null);

  const QueryURL = "https://api.studio.thegraph.com/query/69141/final/v0.0.1";
  const client = createClient({
    url: QueryURL
  });
  
  const queryDepartments = `
    {
      departmentRegistereds(first: 10) {
        id
        departmentAddress
        name
        blockNumber
        blockTimestamp
        transactionHash
      }
    }
  `;
  
  const queryDepartmentById = `
    query GetDepartment($id: String!) {
      departmentRegistered(id: $id) {
        id
        departmentAddress
        name
        blockNumber
        blockTimestamp
        transactionHash
      }
    }
  `;

  useEffect(() => {
    const getData = async () => {
      const { data } = await client.query(queryDepartments).toPromise();
      console.log(data);
      setDepartmentRegistereds(data.departmentRegistereds);
    };
    getData();
  }, [client, queryDepartments]);

  const handleInputChange = (event) => {
    setInputId(event.target.value);
  };

  const handleQueryById = async () => {
    try {
      const { data } = await client.query(queryDepartmentById, { id: inputId }).toPromise();
      if (data && data.departmentRegistered) {
        setDepartmentDetails(data.departmentRegistered);
      } else {
        console.error("Department not found.");
        setDepartmentDetails(null);
      }
    } catch (error) {
      console.error("Error fetching department:", error);
      setDepartmentDetails(null);
    }
  };

  return (
    <>
    <div className="section centered1">
        <h1>Query Department by ID</h1>
        <div className="centered">
          <input
            type="text"
            placeholder="Enter Department ID"
            value={inputId}
            onChange={handleInputChange}
          />
          <button onClick={handleQueryById}>Query</button>
        </div>
        {departmentDetails && (
          <div className="department-details">
            <h2>Department Details</h2>
            <p>ID: {departmentDetails.id}</p>
            <p>Department Address: {departmentDetails.departmentAddress}</p>
            <p>Name: {departmentDetails.name}</p>
            <p>Block Number: {departmentDetails.blockNumber}</p>
            <p>Block Timestamp: {departmentDetails.blockTimestamp}</p>
            <p>Transaction Hash: {departmentDetails.transactionHash}</p>
          </div>
        )}
      </div>
      <div className="container">
        <div className="section">
          <h1>Departments Information</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Department Address</th>
                <th>Name</th>
                <th>Block Number</th>
                <th>Block Timestamp</th>
                <th>Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {departmentRegistereds.map(department => (
                <tr key={department.id}>
                  <td>{department.id}</td>
                  <td>{department.departmentAddress}</td>
                  <td>{department.name}</td>
                  <td>{department.blockNumber}</td>
                  <td>{department.blockTimestamp}</td>
                  <td>{department.transactionHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </>
  );
}

export default Departments;
