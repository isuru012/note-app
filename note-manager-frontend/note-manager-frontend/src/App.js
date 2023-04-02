import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect();
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, loginWithRedirect]);

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <p>You are now logged in!</p>
        </div>
    );
};

export default App;
