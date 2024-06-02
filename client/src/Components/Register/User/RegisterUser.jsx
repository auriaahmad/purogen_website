import React, { useState, useEffect } from 'react';
import '../../../App.css';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import axios from 'axios';
import video from '../../../Assets/video.mp4';
import purogenLogo from '../../../Assets/purogen.png';
import RegisteredUserInfo from '../User/RegisteredUserInfo';

const RegisterUser = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [searchOption, setSearchOption] = useState('box_name');
  const [searchQuery, setSearchQuery] = useState('');
  const [userDetails, setUserDetails] = useState({
    username: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    password: '',
    email: ''
  });
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    // Fetch the list of customers
    axios.get('http://localhost:3006/allRegisteredCustomers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedCustomerData = customers.find(customer => customer[searchOption] === selectedCustomer);

    if (!selectedCustomerData) {
      alert('Please select a valid customer.');
      return;
    }

    const registrationData = {
      customer_id: selectedCustomerData.customer_id,
      ...userDetails
    };

    axios.post('http://localhost:3006/userReg', registrationData)
      .then(response => {
        alert('User registered successfully');
        setNewUser(response.data.user);
        setSelectedCustomer('');
        setUserDetails({
          username: '',
          first_name: '',
          last_name: '',
          phone_number: '',
          password: '',
          email: ''
        });
        setSearchQuery('');
      })
      .catch(error => {
        console.error('Error registering user:', error);
        alert('Error registering user.');
      });
  };

  const filteredCustomers = customers.filter(customer => customer[searchOption].toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <br />
            <img src={purogenLogo} alt="Purogen Logo" />
            <br />
            <h2 className="title">Register a User Here!</h2>
          </div>
        </div>

        <div className="formDiv flex">
          <form action="" className="form grid" onSubmit={handleSubmit}>
            <div className="inputDiv">
              <label htmlFor="searchOptions">Search By:</label>
              <select className="input" id="searchOptions" value={searchOption} onChange={handleOptionChange}>
                <option value="box_name">Box Name</option>
                <option value="username">Username</option>
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="phone_number">Phone Number</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div className="inputDiv">
              <label htmlFor="customer">Select Customer:</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="customer"
                  placeholder="Start typing to search..."
                  value={selectedCustomer}
                  onChange={handleCustomerChange}
                  list="customer-list"
                />
                <datalist id="customer-list">
                  {filteredCustomers.map(customer => (
                    <option key={customer.customer_id} value={customer[searchOption]}>
                      {customer[searchOption]}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Username"
                  value={userDetails.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="first_name">First Name</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Enter First Name"
                  value={userDetails.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="last_name">Last Name</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Enter Last Name"
                  value={userDetails.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="phone_number">Phone Number</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  placeholder="Enter Phone Number"
                  value={userDetails.phone_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={userDetails.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn flex">
              <span>Register</span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>
        </div>
      </div>
      <RegisteredUserInfo newUser={newUser} />
    </div>
  );
};

export default RegisterUser;
