import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Approved from './components/Approved';
import Departments from './components/Departments';
import Home from "./components/Home";
import Merchants from './components/Merchants';
import Transfer from './components/Transfers';
import Users from './components/Users';
import Usersa from './components/Usersa';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/approved' element={<Approved/>}/>
          <Route path='/departments' element={<Departments/>}/>
          <Route path='/merchants' element={<Merchants/>}/>
          <Route path='/transfer' element={<Transfer/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/usersa' element={<Usersa/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
