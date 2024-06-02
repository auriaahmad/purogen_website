import React, { useState, useEffect } from 'react';
import '../../../App.css';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';
import axios from 'axios';
import video from '../../../Assets/video.mp4';
import purogenLogo from '../../../Assets/purogen.png';
import RegisteredMachineInfo from './RegisteredMachineInfo';

const RegisterMachine = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [searchOption, setSearchOption] = useState('box_name');
  const [searchQuery, setSearchQuery] = useState('');
  const [machineID, setMachineID] = useState('');
  const [machineLocation, setMachineLocation] = useState('');
  const [newRegMachine, setNewRegMachine] = useState({});

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

  const handleMachineIDChange = (event) => {
    setMachineID(event.target.value);
  };

  const handleMachineLocationChange = (event) => {
    setMachineLocation(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
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
      machine_id: machineID,
      machine_location: machineLocation,
    };

    axios.post('http://localhost:3006/machineReg', registrationData)
      .then(response => {
        alert('Machine registered successfully');
        console.log(response.data);
        setNewRegMachine(response.data.machine);
        setSelectedCustomer('');
        setMachineID('');
        setMachineLocation('');
        setSearchQuery('');
      })
      .catch(error => {
        console.error('Error registering machine:', error);
        alert('Error registering machine.');
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
            <h2 className="title">Register a Machine Here!</h2>
          </div>
        </div>

        <div className="formDiv flex">
          <form action="" className="form grid" onSubmit={handleSubmit}>
            <div className="inputDiv">
              <label htmlFor="searchOptions">Search By:</label>
              <select className='input' id="searchOptions" value={searchOption} onChange={handleOptionChange}>
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
              <label htmlFor="machineID">Machine ID</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="text"
                  id="machineID"
                  placeholder="Enter Machine ID"
                  value={machineID}
                  onChange={handleMachineIDChange}
                  required
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="machineLocation">Machine Location</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="text"
                  id="machineLocation"
                  placeholder="Enter Machine Location"
                  value={machineLocation}
                  onChange={handleMachineLocationChange}
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
      <RegisteredMachineInfo newMachine={newRegMachine} />
    </div>
  );
};

export default RegisterMachine;
