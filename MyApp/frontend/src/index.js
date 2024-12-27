import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import { NoteProvider } from './context/NoteContext';
import { ToastContainer } from 'react-toastify';
import {
    BrowserRouter as Router,
    Routes, Route

} from 'react-router'

import Login from './components/Login'
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import {
    ProctectedRoute, ProctectedRouteLogin
} from './components/ProctectedRoute';



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <AuthProvider>
        <NoteProvider>
            <Router>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={
                        <ProctectedRoute>
                            <App />
                        </ProctectedRoute>
                    } />
                    <Route path="/login" element={
                        <ProctectedRouteLogin>
                            <Login />
                        </ProctectedRouteLogin>

                    } />
                    <Route path="/register" element={
                        <ProctectedRouteLogin>
                            <Register />
                        </ProctectedRouteLogin>
                    } />
                </Routes>
            </Router>
        </NoteProvider>
    </AuthProvider>

);
reportWebVitals();
