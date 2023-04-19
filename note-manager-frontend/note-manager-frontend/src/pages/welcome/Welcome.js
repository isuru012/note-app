import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import './Welcome.css';
import BackgroundImage from "../../components/BackgroundImage/BackgroundImage";


export default function Welcome() {
    useEffect(() => {
        document.body.classList.add('welcome-page');
        return () => {
            document.body.classList.remove('welcome-page');
        };
    }, []);

    return (
        <BackgroundImage>
        <div className="button-container">
            <Button variant="outlined" component={Link} to="/login">Login</Button>
        </div>
        </BackgroundImage>


    );
}