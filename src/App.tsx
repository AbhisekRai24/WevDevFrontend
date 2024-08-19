import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import {Footer} from './public/Footer';
import Login from './public/Login'
import Register from './public/Register'
import Home from './public/Home'


import Dashboard from './admin/Dashboard';
import SellBike from './admin/Sellbike';
import ProductList from './admin/ProductList';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';



function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/sellbike" element={<SellBike />} />
        <Route path="/admin/productlist" element={<ProductList />}/>
        
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  </div>
);
}

export default App;
