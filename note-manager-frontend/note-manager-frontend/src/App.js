import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { useAuth0 } from '@auth0/auth0-react';
import Home from "./pages/login/Login";
import { Route,Routes } from 'react-router-dom';
import Welcome from "./pages/welcome/Welcome";


function App() {
    return (
        <div >

            <Routes>
                <Route path='/' element={<Welcome/>}/>
                <Route path='/login' element={<Home/>}/>

            </Routes>

        </div>
    );
}

export default App;
