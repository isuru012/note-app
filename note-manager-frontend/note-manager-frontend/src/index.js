import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";
import WrappedApp from "./App";
import {BrowserRouter} from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0Provider
                domain="dev-l0xf5xdwwet2yd1t.us.auth0.com"
                clientId="Z5oJqfnqIFe3ac1lCwwZiGe9cWEpwon6"
                authorizationParams={{
                    redirect_uri: window.location.origin
                }}
            >
                <App/>

            </Auth0Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
