import React from 'react';
import axios from 'axios';
import { BiLogOutCircle } from 'react-icons/bi';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      // Get the admin_session_id from localStorage
      const admin_session_id = JSON.parse(localStorage.getItem('user')).admin_session_id;

      // Make a POST request to the logout endpoint with admin_session_id
      await axios.post('http://localhost:3006/logout', {
        admin_session_id: admin_session_id,
      });

      // Invoke the callback function passed from the parent component
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="menuLink flex">
      <BiLogOutCircle className="icon" />
      <span className="smallText">Log Out</span>
    </button>
  );
};

export default Logout;
