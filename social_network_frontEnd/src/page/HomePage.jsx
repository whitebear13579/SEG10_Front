import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChatMessage from '../components/ChatMessage';
import ChatAvatar from '../components/ChatAvatar';
import '../assets/page/home.css';
function HomePage(){
    
    const { user, logout } = useContext(AuthContext); // Access user and logout from context
    const navigate = useNavigate();

    // Handle logout functionality
    const handleLogout = () => {
        logout(); // Clear user from context and localStorage
        navigate('/login'); // Redirect to login page
    };

    if (!user) {
        return <p>Loading user data...</p>; // Show a loading state if user data isn't ready
    }

    return (
        <div className="container">
        <h1>Welcome, {user.name}!</h1>
        <p>Email: {user.id}</p>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default HomePage;