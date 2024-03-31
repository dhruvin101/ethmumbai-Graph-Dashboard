import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <>
    <h1>Dashboard</h1>
    <div className="card-container">
      <div className="card education">
        <Link to={"/approved"}><span>Approved</span></Link>
      </div>
      <div className="card agriculture">
        <Link to={"/departments"}><span>Departments registered</span></Link>
      </div>
      <div className="card infrastructure">
        <Link to={"/merchants"}><span>Merchants Registered</span></Link>
      </div>
      <div className="card retail">
        <Link to={"/transfer"}><span>Transfers</span></Link>
      </div>
      {/* <div className="card medical">
        <Link to={"/users"}><span>Users Authenticated</span></Link>
      </div> */}
      <div className="card housing">
        <Link to={"/usersa"}><span>Users Registered</span></Link>
      </div>
    </div>
    </>
  );
};

export default Home;