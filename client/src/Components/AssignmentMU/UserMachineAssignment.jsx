import React, { useState, useEffect } from 'react';
import '../../App.css';
import { FaUserShield } from 'react-icons/fa';
import { AiOutlineSwapRight } from 'react-icons/ai';
import axios from 'axios';
import video from '../../Assets/video.mp4';
import purogenLogo from '../../Assets/purogen.png';

const AssignmentMachineUser = () => {
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [searchOption, setSearchOption] = useState('username');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedCustomerName, setSelectedCustomerName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [machineFilter, setMachineFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3006/allRegisteredCustomers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      axios.get('http://localhost:3006/allRegisteredUsers')
        .then(response => {
          const filteredUsers = response.data.filter(user => user.customer_id === selectedCustomer);
          setUsers(filteredUsers);
        })
        .catch(error => console.error('Error fetching users:', error));

      axios.get('http://localhost:3006/allRegisteredMachines')
        .then(response => {
          const filteredMachines = response.data.filter(machine => machine.customer_id === selectedCustomer);
          setMachines(filteredMachines);
        })
        .catch(error => console.error('Error fetching machines:', error));
    } else {
      setUsers([]);
      setMachines([]);
    }
  }, [selectedCustomer]);

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value);
    clearFields();
  };

  const handleCustomerChange = (e) => {
    const customerName = e.target.value;
    setSelectedCustomerName(customerName);
    const customer = customers.find(c => c[searchOption] === customerName);
    if (customer) {
      setSelectedCustomer(customer.customer_id);
    } else {
      setSelectedCustomer('');
      setUsers([]);
      setMachines([]);
    }
    setSelectedUser('');
    setSelectedUserId('');
    setSelectedMachines([]);
  };

  const handleUserInput = (e) => {
    const inputValue = e.target.value;
    setSelectedUser(inputValue);
    const user = users.find(u => u.username === inputValue);
    setSelectedUserId(user ? user.user_id : '');
  };

  const handleMachineFilterChange = (e) => {
    setMachineFilter(e.target.value);
  };

  const handleMachineChange = (e) => {
    const machineId = e.target.value;
    setSelectedMachines(prev => 
      prev.includes(machineId) ? prev.filter(id => id !== machineId) : [...prev, machineId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const assignments = selectedMachines.map(machineId => ({
      customer_id: selectedCustomer,
      machine_register_id: machineId,
      user_id: selectedUserId
    }));

    axios.post('http://localhost:3006/userMachineAssign', assignments)
      .then(response => {
        alert('Machines assigned successfully');
        clearFields();
      })
      .catch(error => console.error('Error assigning machines:', error));
  };

  const clearFields = () => {
    setSelectedCustomer('');
    setSelectedCustomerName('');
    setSelectedUser('');
    setSelectedUserId('');
    setSelectedMachines([]);
    setMachineFilter('');
    setUsers([]);
    setMachines([]);
  };

  const filteredCustomers = customers.filter(customer => 
    customer[searchOption].toLowerCase().includes(selectedCustomerName.toLowerCase())
  );

  const filteredMachines = machines.filter(machine =>
    machine.machine_id.toLowerCase().includes(machineFilter.toLowerCase())
  );

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
              <label htmlFor="searchOptions">Search Customer By:</label>
              <select className='input' id="searchOptions" value={searchOption} onChange={handleOptionChange}>
                <option value="username">Username</option>
                <option value="box_name">Box Name</option>
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="phone_number">Phone Number</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div className="inputDiv">
              <label htmlFor="customer">Select Customer:</label>
              <div className="input flex">
                <input
                  className='input'
                  type="text"
                  id="customer"
                  value={selectedCustomerName}
                  onChange={handleCustomerChange}
                  disabled={customers.length === 0}
                  placeholder="Start typing to search..."
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
              <label htmlFor="user">Select User:</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  className='input'
                  type="text"
                  id="user"
                  value={selectedUser}
                  onChange={handleUserInput}
                  disabled={!selectedCustomer}
                  placeholder="Start typing to search..."
                  list="user-list"
                />
                <datalist id="user-list">
                  {users.map(user => (
                    <option key={user.user_id} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </datalist>
              </div>
            </div>
            
            <div className="inputDiv">
              <label htmlFor="machineSearch">Search Machine:</label>
              <input
                className='input'
                type="text"
                id="machineSearch"
                value={machineFilter}
                placeholder='Search by ID'
                onChange={handleMachineFilterChange}
                disabled={!selectedCustomer || !selectedUserId}
              />
            </div>

            <div className="inputDiv">
              <label htmlFor="machine">Select Machine:</label>
              <div className="machine-list">
                {filteredMachines.map(machine => (
                  <div key={machine.machine_register_id} className="machine-item">
                    <label>
                      <input
                        type="checkbox"
                        value={machine.machine_register_id}
                        checked={selectedMachines.includes(machine.machine_register_id)}
                        onChange={handleMachineChange}
                        disabled={!selectedCustomer || !selectedUserId}
                      />
                      {machine.machine_id} - {machine.machine_location}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn flex"
              disabled={!selectedCustomer || !selectedUserId}
            >
              <span>Assign Machines</span>
              <AiOutlineSwapRight className="icon" />
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignmentMachineUser;