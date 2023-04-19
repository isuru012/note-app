import React, {useEffect} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import './Dashboard.css';
import Navbar from "../../components/NavBar/Navbar";
import Welcome from "../welcome/Welcome";
import Login from "../login/Login";
import ViewAll from "../viewall/ViewAll";
import {BrowserRouter} from "react-router-dom";
import Newnote from "../newNote/Newnote";
import Button from "@mui/material/Button";
import BackgroundImage from "../../components/BackgroundImage/BackgroundImage";

function Dashboard() {

    useEffect(() => {
        document.body.classList.add('dashboard-page');
        return () => {
            document.body.classList.remove('dashboard-page');
        };
    }, []);
    return (

        <BackgroundImage>
            <div>
                <Navbar/>
            </div>
        </BackgroundImage>


);
}

export default Dashboard;