import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from './TopSection/Top';
import Listing from './ListingSection/Listing';
import '../../../App.css';

const Body = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const customer_id = JSON.parse(localStorage.getItem('user')).customer_id;
    axios.get(`http://localhost:3006/particularCustomerMachine/${customer_id}`, { withCredentials: true })
      .then(response => {
        setMachines(response.data);
      })
      .catch(error => {
        console.error('Error fetching machine data:', error);
      });
  }, []);

  return (
    <div className='mainContent'>
      <Top />
      <div className="bottom">
        <Listing machines={machines} />
      </div>
    </div>
  );
};

export default Body;