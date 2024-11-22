import React, {useState, useEffect} from 'react';
import LoginPage from './page/LoginPage';
import HomePage from './page/HomePage';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [loginData, setLoginData] = useState(null);
  const handleLogin = (data) => {
    setLoginData(data); 
    localStorage.setItem('loginData', JSON.stringify(data));
    console.log(data);
  };
  return (
    <GoogleOAuthProvider clientId='367618606560-nb7qi1pvcb8urbrlakaarptegisvs35d.apps.googleusercontent.com'>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage  onSendResponse={handleLogin} />}  />
          <Route path="/home" element={<HomePage />}  />  
          {/*<Route path="/userInfo" element={<UserProfile />} />  
          <Route path="/friendList" element={<FriendListPage responseData={responseData}/>} />   
          <Route path="/friendRequest" element={<FriendRequestPage />} />  */}

          {/*for no defined page */}
          <Route path="*" element={<Navigate to="/login"/>} />
        </Routes>
      </HashRouter>
    </GoogleOAuthProvider>
  )
}

export default App
