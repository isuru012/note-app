import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import {Link, Redirect } from "react-router-dom";

const LoginButton = () => {
    const { loginWithRedirect,user,isAuthenticated ,logout} = useAuth0();


    return (
        <div className="button-container">
            {!isAuthenticated && (
                <Button
                    onClick={() => loginWithRedirect()}
                    variant="outlined"
                    component={Link}
                    to="/login"
                >
                    Login
                </Button>
            )}
            {isAuthenticated && (
                <Button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    variant="outlined"
                    component={Link}
                    to="/logout"
                >
                    Logout
                </Button>
            )}

            {isAuthenticated && (
        //         <pre style={{ textAlign: "start" }}>
        //   {JSON.stringify(user, null, 2)}
        // </pre>
                <div>{JSON.stringify({ redirectUri: "http://localhost:3000/login" })}</div>

            )}
        </div>

    );
};

export default LoginButton;