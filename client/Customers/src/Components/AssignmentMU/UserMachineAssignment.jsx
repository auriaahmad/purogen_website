import React, { useState, useEffect } from 'react';
import '../../App.css';
import { FaUserShield } from 'react-icons/fa';
import { AiOutlineSwapRight } from 'react-icons/ai';
import axios from 'axios';
import video from '../../Assets/video.mp4';
import purogenLogo from '../../Assets/purogen.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignmentMachineUser = () => {
  const [users, setUsers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [assignedMachines, setAssignedMachines] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [machineFilter, setMachineFilter] = useState('');

  const customer_id = JSON.parse(localStorage.getItem('user')).customer_id;

  useEffect(() => {
    axios.get(`http://localhost:3006/particularCustomerAllUsers/${customer_id}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, [customer_id]);

  useEffect(() => {
    axios.get(`http://localhost:3006/particularCustomerMachine/${customer_id}`)
      .then(response => setMachines(response.data))
      .catch(error => console.error('Error fetching machines:', error));
  }, [customer_id]);

  useEffect(() => {
    if (selectedUserId) {
      axios.get(`http://localhost:3006/userMachineAssignments/${selectedUserId}`)
        .then(response => {
          const assignedMachineIds = response.data.map(assignment => assignment.machine_register_id);
          setAssignedMachines(assignedMachineIds);
          setSelectedMachines(assignedMachineIds);
        })
        .catch(error => console.error('Error fetching user machine assignments:', error));
    } else {
      setAssignedMachines([]);
      setSelectedMachines([]);
    }
  }, [selectedUserId]);

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
      customer_id: customer_id,
      machine_register_id: machineId,
      user_id: selectedUserId,
      action: 'assign'
    }));

    const unassignments = assignedMachines.filter(machineId => !selectedMachines.includes(machineId)).map(machineId => ({
      customer_id: customer_id,
      machine_register_id: machineId,
      user_id: selectedUserId,
      action: 'unassign'
    }));

    axios.post('http://localhost:3006/userMachineAssign', [...assignments, ...unassignments])
      .then(response => {
        toast.success('Machines assigned/unassigned successfully');
        clearFields();
      })
      .catch(error => {
        console.error('Error assigning/unassigning machines:', error);
        toast.error('Error assigning/unassigning machines');
      });
  };

  const clearFields = () => {
    setSelectedUser('');
    setSelectedUserId('');
    setSelectedMachines([]);
    setMachineFilter('');
    setAssignedMachines([]);
  };

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
            <h2 className="title">Assign or Unassign Machines to a User Here!</h2>
          </div>
        </div>

        <div className="formDiv flex">
          <form className="form grid" onSubmit={handleSubmit}>
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
                disabled={!selectedUserId}
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
                        disabled={!selectedUserId}
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
              disabled={!selectedUserId}
            >
              <span>Assign Machines</span>
              <AiOutlineSwapRight className="icon" />
            </button>

          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AssignmentMachineUser;