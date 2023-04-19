import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();

    const handleLogOut=()=>{
        localStorage.removeItem('username');
        localStorage.removeItem('password');

        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar">
                <ul className="navbar__menu">
                    <li>
                        <Link to="/dashboard">Home</Link>
                    </li>
                    <li>
                        <Link to="/viewAll">View All Notes</Link>
                    </li>
                    <li>
                        <Link to="/newNote">New Note</Link>
                    </li>
                </ul>

                <form className="navbar__search">
                    <input type="text" placeholder="Search notes..." />
                    <button type="submit" style={{marginRight:3}} >Search</button>

                    <button type="submit" onClick={handleLogOut} >Log Out</button>
                </form>
            </nav>
        </div>
    );
}

export default Navbar;