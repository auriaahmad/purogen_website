import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from './TopSection/Top';
import Listing from './ListingSection/Listing';
import '../../../App.css'

const Body = () => {



  const [users, setUsers] = useState([]);


  const [userCount, setUserCount] = useState({ currentDate: 0, currentMonth: 0 });
  useEffect(() => {
    axios.get('http://localhost:3006/users',{ withCredentials: true })
      .then(response => {
        const users = response.data;
        setUsers(users);
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;

        const usersWithCurrentDate = users.filter(user => {
          const userDate = new Date(user.created_at);
          return userDate.getDate() === currentDay && userDate.getMonth() + 1 === currentMonth;
        });

        const usersWithCurrentMonth = users.filter(user => {
          const userDate = new Date(user.created_at);
          return userDate.getMonth() + 1 === currentMonth;
        });

        const usersCountWithCurrentDate = usersWithCurrentDate.length;
        const usersCountWithCurrentMonth = usersWithCurrentMonth.length;

        setUserCount({ currentDate: usersCountWithCurrentDate, currentMonth: usersCountWithCurrentMonth });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  return (
    <div className='mainContent'>
      <Top userCount={userCount}/>
      <div className="bottom flex">
        <Listing users={users} />
      </div>
    </div>
  );
};

export default Body;
