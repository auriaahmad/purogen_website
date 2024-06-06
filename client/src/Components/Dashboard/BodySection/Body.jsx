import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from './TopSection/Top';
import Listing from './ListingSection/Listing';
import CustomersListing from '../../Actions/Customers';
import '../../../App.css'

const Body = () => {



  const [customers, setCustomers] = useState([]);


  const [userCount, setUserCount] = useState({ currentDate: 0, currentMonth: 0 });
  useEffect(() => {
    axios.get('http://localhost:3006/allRegisteredCustomers',{ withCredentials: true })
      .then(response => {
        const customers = response.data;
        setCustomers(customers);
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;

        const customersWithCurrentDate = customers.filter(user => {
          const userDate = new Date(user.created_at);
          return userDate.getDate() === currentDay && userDate.getMonth() + 1 === currentMonth;
        });

        const customersWithCurrentMonth = customers.filter(user => {
          const userDate = new Date(user.created_at);
          return userDate.getMonth() + 1 === currentMonth;
        });

        const customersCountWithCurrentDate = customersWithCurrentDate.length;
        const customersCountWithCurrentMonth = customersWithCurrentMonth.length;

        setUserCount({ currentDate: customersCountWithCurrentDate, currentMonth: customersCountWithCurrentMonth });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  return (
    <div className='mainContent'>
      <Top userCount={userCount}/>
      <div className="bottom flex">
        <Listing customers={customers} />
      </div>
    </div>
  );
};

export default Body;