import React, { useState, useEffect } from 'react';
import '../../App.css';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import axios from 'axios';
import video from '../../Assets/video.mp4';
import purogenLogo from '../../Assets/purogen.png';
import RegisteredMachineInfo from './RegisteredMachineInfo';

const AssignmentMachineUser = () => {
  const [customers, setCustomers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allMachines, setAllMachines] = useState([]);
  const [users, setUsers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [searchOption, setSearchOption] = useState('box_name');
  const [searchQuery, setSearchQuery] = useState('');
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

    // Fetch the list of all users
    axios.get('http://localhost:3006/allRegisteredUsers')
      .then(response => {
        setAllUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Fetch the list of all machines
    axios.get('http://localhost:3006/allRegisteredMachines')
      .then(response => {
        setAllMachines(response.data);
      })
      .catch(error => {
        console.error('Error fetching machine data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      // Filter users based on selected customer
      const filteredUsers = allUsers.filter(user => user.customer_id === selectedCustomer);
      setUsers(filteredUsers);

      // Filter machines based on selected customer
      const filteredMachines = allMachines.filter(machine => machine.customer_id === selectedCustomer);
      setMachines(filteredMachines);

      // Reset selections
      setSelectedUser('');
      setSelectedMachines([]);
    }
  }, [selectedCustomer, allUsers, allMachines]);

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleMachineChange = (event) => {
    const machineId = event.target.value;
    setSelectedMachines((prevSelectedMachines) =>
      prevSelectedMachines.includes(machineId)
        ? prevSelectedMachines.filter((id) => id !== machineId)
        : [...prevSelectedMachines, machineId]
    );
  };

  const handleOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedCustomer || !selectedUser || selectedMachines.length === 0) {
      alert('Please select a valid customer, user, and at least one machine.');
      return;
    }

    const registrationData = selectedMachines.map(machineId => ({
      customer_id: selectedCustomer,
      machine_register_id: machineId,
      user_id: selectedUser,
    }));

    axios.post('http://localhost:3006/userMachineAssign', registrationData)
      .then(response => {
        alert('Machines assigned to user successfully');
        console.log(response.data);
        setNewRegMachine(response.data.machine);
        setSelectedCustomer('');
        setSelectedUser('');
        setMachines([]);
        setSelectedMachines([]);
        setSearchQuery('');
      })
      .catch(error => {
        console.error('Error assigning machines to user:', error);
        alert('Error assigning machines to user.');
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
            <h2 className="title">Assign Machines to User Here!</h2>
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
                    <option key={customer.customer_id} value={customer.customer_id}>
                      {customer[searchOption]}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>

            {selectedCustomer && (
              <div className="inputDiv">
                <label htmlFor="user">Select User:</label>
                <div className="input flex">
                  <FaUserShield className="icon" />
                  <select id="user" value={selectedUser} onChange={handleUserChange} required>
                    <option value="">Select User</option>
                    {users.map(user => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.username} - {user.first_name} {user.last_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {selectedUser && (
              <div className="inputDiv">
                <label>Select Machines:</label>
                {machines.map(machine => (
                  <div key={machine.machine_register_id} className="input flex">
                    <input
                      type="checkbox"
                      value={machine.machine_register_id}
                      checked={selectedMachines.includes(machine.machine_register_id)}
                      onChange={handleMachineChange}
                    />
                    <label>{machine.machine_id} - {machine.machine_location}</label>
                  </div>
                ))}
              </div>
            )}

            <button type="submit" className="btn flex">
              <span>Assign Machines</span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>
        </div>
      </div>
      {/* <RegisteredMachineInfo newMachine={newRegMachine} /> */}
    </div>
  );
};

export default AssignmentMachineUser;