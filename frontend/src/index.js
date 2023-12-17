import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './firebase';
import AuthContext from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContext>
        <App />
    </AuthContext>
);