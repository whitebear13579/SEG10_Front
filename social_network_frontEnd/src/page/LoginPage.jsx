import { Navigate, useNavigate } from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';
import '../assets/page/login.css';
const API_URL = 'https://swep.hnd1.zeabur.app/user/api/user-get';
import React from 'react';
export default function Login({onSendResponse})
{
  const navigate = useNavigate();
  const sendIDRequest = async(email, emailName) => {
    try {
      const response = await fetch( API_URL , { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: email }) 
      });
  
      if (!response.ok) { //then add user
        try {
          const response = await fetch( 'https://swep.hnd1.zeabur.app/user/api/user-add' , { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: email ,name: emailName}) 
          });
        } catch (error) {
          console.error('Error during addUser:', error);
        }
      };
      const data = await response.json(); 
      onSendResponse(data); 
      localStorage.setItem('responseData', JSON.stringify(data));
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  function changeTokenToEmail(accessToken){
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
    .then(response => {
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Log the parsed user info
      console.log('User Info:', data);
      sendIDRequest(data.email, data.name);
    })
    .catch(error => {
      // Log any errors that occur during the fetch
      console.error('Error fetching user info:', error);
    });
  }

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
          const token = codeResponse.access_token;
          changeTokenToEmail(token);
          navigate('/home');
      },
      onError: (error) => {
          console.error("Login failed:", error);
      },
  });
  return (
      <div className="Login">
          <div className="leftcover">
          </div>
          <div className="rightcover">
          <div className="loginBox">
              <h1 className="SignIN">Sign in</h1>
              <button onClick={() => login()} style={{background:'white', color:'black', padding:10}}>
              <img src="https://img.icons8.com/color/48/000000/google-logo.png"/>Sign in with Google</button>
          </div>
              
          </div>
      </div>   
  )
};