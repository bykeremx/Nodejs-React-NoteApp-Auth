import React ,{useContext}from 'react'
import {Navigate} from 'react-router';

import AuthContext from '../context/AuthContext';

export const ProctectedRoute = ({children}) => {
  const {AuthState} = useContext(AuthContext);
  if (!AuthState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}


//giriş yapıldıktan sonra ! 
export const ProctectedRouteLogin = ({children}) => {
  const {AuthState} = useContext(AuthContext);
  if (AuthState.isAuthenticated) {
      return <Navigate to="/" />;
  }
  return children;
}

