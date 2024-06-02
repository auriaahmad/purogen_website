import React, { useState } from 'react';
import '../../../../App.css';
import { BiSearchAlt } from 'react-icons/bi';
import axios from 'axios';
import Modal from 'react-modal';
import ParticularCustomerMachineData from './MachineDataActivity';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    width: '90%',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

const MachineList = ({ onClose, selectedCustomerMachines, customerProfileData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('machine_id');
  const [selectedMachineData, setSelectedMachineData] = useState([]);
  const [isMachineModalOpen, setIsMachineModalOpen] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredData = selectedCustomerMachines.filter((machine) => {
    const fieldValue = machine[selectedOption].toString().toLowerCase();
    return fieldValue.includes(searchQuery.toLowerCase());
  });

  const handleMachineRowClick = (machine) => {
    console.log(machine.machine_id);
    axios
      .get(`http://localhost:3006/particularCustomerMachineData/${machine.machine_id}`, { withCredentials: true })
      .then((response) => {
        setIsMachineModalOpen(true);
        setSelectedMachineData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching machine data:', error);
      });
  };

  const handleCloseMachineModal = () => {
    setIsMachineModalOpen(false);
    setSelectedMachineData([]);
  };

  return (
    <>
      <div className="lisitingSection">
        <div className="heading flex">
          <h1>
            {customerProfileData.first_name.charAt(0).toUpperCase() + customerProfileData.first_name.slice(1)}{' '}
            {customerProfileData.last_name.charAt(0).toUpperCase() + customerProfileData.last_name.slice(1)}'s Machines
          </h1>
          <div className="searchBar">
            <label htmlFor="searchOptions">Search By:</label>
            <select id="searchOptions" value={selectedOption} onChange={handleSelectChange}>
              <option value="machine_id">Machine ID</option>
              <option value="machine_location">Machine Location</option>
            </select>
            <input
              type="text"
              placeholder={`Type...`}
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <BiSearchAlt className="icon" />
          </div>
        </div>
        <br />

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Machine ID</th>
                <th>Machine Location</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((machine, index) => (
                <tr key={machine.machine_register_id} onClick={() => handleMachineRowClick(machine)}>
                  <td>{index + 1}</td>
                  <td>{machine.machine_id}</td>
                  <td>{machine.machine_location}</td>
                  <td>{new Date(machine.created_at).toISOString().split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isMachineModalOpen}
        onRequestClose={handleCloseMachineModal}
        contentLabel="Machine Data Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        {isMachineModalOpen && (
          <ParticularCustomerMachineData onClose={handleCloseMachineModal} selectedMachineData={selectedMachineData} customerProfileData = {customerProfileData} />
        )}
      </Modal>
      <button onClick={onClose}>Close</button>
    </>
  );
};

export default MachineList;
