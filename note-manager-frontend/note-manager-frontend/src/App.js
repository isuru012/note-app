
import { Route,Routes } from 'react-router-dom';
import  {LoginPage, RegistrationPage} from "./pages/welcome/Welcome";
import Login from "./pages/login/Login";
import Welcome from "./pages/welcome/Welcome";
import Dashboard from "./pages/dashboard/Dashboard";
import ViewAll from "./pages/viewall/ViewAll";
import Newnote from "./pages/newNote/Newnote";
import React from "react";


function App() {
    return (
        <div >

            <Routes>
                <Route path='/' element={<Welcome/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/viewAll' element={<ViewAll/>}/>
                <Route path='/newNote' element={<Newnote/>}/>

            </Routes>

        </div>
    );
}


export default App;
