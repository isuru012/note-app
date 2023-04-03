import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import './Welcome.css';


export default function Welcome() {


    return (
        <div className="button-container">
            <Button variant="outlined" component={Link} to="/login">Login</Button>
        </div>


    );
}
