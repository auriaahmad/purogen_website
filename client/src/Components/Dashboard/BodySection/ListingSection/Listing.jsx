// import React from 'react'
import './listing.css'
import { BiSearchAlt } from 'react-icons/bi'
// import { BsArrowRightShort } from 'react-icons/bs'
// import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
// import img from '../../../../Assets/images (1).png'
// // import img1 from '../../../Assets/images (9).png'
// // import img2 from '../../../Assets/images (8).png'
// // import img3 from '../../../Assets/images (10).png'
// import user1 from '../../../../Assets/aldi.jpg'
// import user2 from '../../../../Assets/dadang.jpg'
// import user3 from '../../../../Assets/gilbert.jpg'
// import user4 from '../../../../Assets/aldi.jpg'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Listing = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('username');
  const [selectedUser, setSelectedUser] = useState([]);
  useEffect(() => {
    // Fetch user data from your backend API
    axios.get('http://localhost:3006/users')
      .then(response => {
        setUsers(response.data); // Assuming your API response returns an array of user objects
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const filteredUsers = users.filter(user => {
    const fieldValue = user[selectedOption].toString().toLowerCase();
    return fieldValue.includes(searchQuery.toLowerCase());
  });

  const handleRowClick = (userId) => {
    // Fetch additional user data based on userId
    axios.get(`http://localhost:3006/particularuserdata/${userId}`)
      .then(response => {
        setSelectedUser(response.data); // Assuming your API response returns user data
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };
  return (
    <div className="lisitingSection">
      <div className="heading flex">
        <h1>Client Listings</h1>
        <div className="searchBar flex">

          <label htmlFor="searchOptions">Search By:</label>
          <select id="searchOptions" value={selectedOption} onChange={handleSelectChange}>
            <option value="username">User Name</option>
            <option value="email">Email</option>
            <option value="phone_number">Phone Number</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="admin">Admin</option>
            <option value="created_at">Created At</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${selectedOption}`}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />

        </div>


        {/* <button className="btn flex">
          See All <BsArrowRightShort className="icon" />
        </button> */}
      </div>



      <div className="secContainer flex">
        <div>

          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Admin</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.user_id} onClick={() => handleRowClick(user.id)}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.admin ? 'Yes' : 'No'}</td>
                  <td>{user.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="secContainer flex">
        <div className="singleItem">
          <AiFillHeart className="icon" />
          <img src={img} alt="Image Name" />
          <h3>Annual Vince</h3>
        </div>

        <div className="singleItem">
          <AiOutlineHeart className="icon" />
          <img src={img} alt="Image Name" />
          <h3>Coffe Plant</h3>
        </div>

        <div className="singleItem">
          <AiOutlineHeart className="icon" />
          <img src={img} alt="Image Name" />
          <h3>Button Fern</h3>
        </div>

        <div className="singleItem">
          <AiFillHeart className="icon" />
          <img src={img} alt="Image Name" />
          <h3>Spider Plant</h3>
        </div>
      </div>

      <div className="sellers flex">
        <div className="topSellers">
          <div className="heading flex">
            <h3>Top Sellers</h3>
            <button className="btn flex">
              See All <BsArrowRightShort className="icon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={user1} alt="User Image" />
              <img src={user2} alt="User Image" />
              <img src={user3} alt="User Image" />
              <img src={user4} alt="User Image" />
            </div>
            <div className="cardText">
              <span>
                14.556 Plant sold <br />
                <small>
                  21 Sellers <span className="date">7 Days</span>
                </small>
              </span>
            </div>
          </div>
        </div>

        <div className="featuredSellers">
          <div className="heading flex">
            <h3>Featured Sellers</h3>
            <button className="btn flex">
              See All <BsArrowRightShort className="icon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={user3} alt="User Image" />
              <img src={user1} alt="User Image" />
              <img src={user4} alt="User Image" />
              <img src={user2} alt="User Image" />
            </div>
            <div className="cardText">
              <span>
                28,556 Plant sold <br />
                <small>
                  26 Sellers <span className="date">31 Days</span>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div >
  )
}

export default Listing