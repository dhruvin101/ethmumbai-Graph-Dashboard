import React, { useEffect, useState } from 'react';
import { createClient } from 'urql';
import '../App.css';

function Approved() {
  const [approvals, setApprovals] = useState([]);
  const [inputId, setInputId] = useState('');
  const [approvalDetails, setApprovalDetails] = useState(null);

  const QueryURL = "https://api.studio.thegraph.com/query/69141/final/v0.0.1";
  const client = createClient({
    url: QueryURL
  });
  const query = `
    {
      approvals(first: 10) {
        id
        owner
        spender
        value
        blockTimestamp
        blockNumber
        transactionHash
      }
    }
  `;

  const queryApprovalById = `
  query GetApproval($id: String!) {
    approval(id: $id) {
      id
      owner
      spender
      value
      blockTimestamp
      blockNumber
      transactionHash
    }
  }
`;


  useEffect(() => {
    const getData = async () => {
      const { data } = await client.query(query).toPromise();
      console.log(data);
      setApprovals(data.approvals);
    };
    getData();
  }, [client,query]);

  const handleInputChange = (event) => {
    setInputId(event.target.value);
  };

  const handleQueryById = async () => {
    try {
      const { data } = await client.query(queryApprovalById, { id: inputId }).toPromise();
      if (data && data.approval) {
        setApprovalDetails(data.approval);
      } else {
        console.error("Approval not found.");
        setApprovalDetails(null);
      }
    } catch (error) {
      console.error("Error fetching approval:", error);
      setApprovalDetails(null);
    }
  };


  return (
    <>
    <div className="section">
        <h1>Query Approval by ID</h1>
        <div className="centered">
          <input
            type="text"
            placeholder="Enter Approval ID"
            value={inputId}
            onChange={handleInputChange}
          />
          <button onClick={handleQueryById} >Query</button>
        </div>
        {approvalDetails && (
          <div className="centered1">
          <h2>Approval Details</h2>
          <p>ID: {approvalDetails.id}</p>
          <p>Owner: {approvalDetails.owner}</p>
          <p>Spender: {approvalDetails.spender}</p>
          <p>Value: {approvalDetails.value}</p>
          <p>Block Timestamp: {approvalDetails.blockTimestamp}</p>
          <p>Block Number: {approvalDetails.blockNumber}</p>
          <p>Transaction Hash: {approvalDetails.transactionHash}</p>
        </div>
        
        )}
      </div>
    <div className="container">
      <div className="section">
        <h1>Approvals Information</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Owner</th>
              <th>Spender</th>
              <th>Value</th>
              <th>Block Timestamp</th>
              <th>Block Number</th>
              <th>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map(approval => (
              <tr key={approval.id}>
                <td>{approval.id}</td>
                <td>{approval.owner}</td>
                <td>{approval.spender}</td>
                <td>{approval.value}</td>
                <td>{approval.blockTimestamp}</td>
                <td>{approval.blockNumber}</td>
                <td>{approval.transactionHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    </>
  );
}

export default Approved;