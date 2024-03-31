import React, { useEffect, useState } from 'react';
import { createClient } from 'urql';
import '../App.css';

function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [inputId, setInputId] = useState('');
  const [transferDetails, setTransferDetails] = useState(null);

  const QueryURL = "https://api.studio.thegraph.com/query/69141/final/v0.0.1";
  const client = createClient({
    url: QueryURL
  });
  
  const queryTransfers = `
    {
      transfers(first: 10) {
        blockNumber
        blockTimestamp
        from
        id
        to
        transactionHash
        value
      }
    }
  `;
  
  const queryTransferById = `
    query GetTransfer($id: String!) {
      transfer(id: $id) {
        blockNumber
        blockTimestamp
        from
        id
        to
        transactionHash
        value
      }
    }
  `;

  useEffect(() => {
    const getData = async () => {
      const { data } = await client.query(queryTransfers).toPromise();
      console.log(data);
      setTransfers(data.transfers);
    };
    getData();
  }, [client, queryTransfers]);

  const handleInputChange = (event) => {
    setInputId(event.target.value);
  };

  const handleQueryById = async () => {
    try {
      const { data } = await client.query(queryTransferById, { id: inputId }).toPromise();
      if (data && data.transfer) {
        setTransferDetails(data.transfer);
      } else {
        console.error("Transfer not found.");
        setTransferDetails(null);
      }
    } catch (error) {
      console.error("Error fetching transfer:", error);
      setTransferDetails(null);
    }
  };

  return (
    <>
      <div className="container">
        <div className="section">
          <h1>Transfers Information</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
                <th>Block Number</th>
                <th>Block Timestamp</th>
                <th>Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map(transfer => (
                <tr key={transfer.id}>
                  <td>{transfer.id}</td>
                  <td>{transfer.from}</td>
                  <td>{transfer.to}</td>
                  <td>{transfer.value}</td>
                  <td>{transfer.blockNumber}</td>
                  <td>{transfer.blockTimestamp}</td>
                  <td>{transfer.transactionHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="section">
        <h1>Query Transfer by ID</h1>
        <div>
          <input
            type="text"
            placeholder="Enter Transfer ID"
            value={inputId}
            onChange={handleInputChange}
          />
          <button onClick={handleQueryById}>Query</button>
        </div>
        {transferDetails && (
          <div className="transfer-details">
            <h2>Transfer Details</h2>
            <p>ID: {transferDetails.id}</p>
            <p>From: {transferDetails.from}</p>
            <p>To: {transferDetails.to}</p>
            <p>Value: {transferDetails.value}</p>
            <p>Block Number: {transferDetails.blockNumber}</p>
            <p>Block Timestamp: {transferDetails.blockTimestamp}</p>
            <p>Transaction Hash: {transferDetails.transactionHash}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Transfers;
