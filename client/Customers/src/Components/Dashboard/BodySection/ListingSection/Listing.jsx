import '../../../../App.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import ParticularCustomerMachineData from '../ActivitySection/MachineDataActivity';
import axios from 'axios';

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
    maxWidth: '100%',
    width: '90%',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

const Listing = ({ machines }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('machine_id');
  const [selectedMachineData, setSelectedMachineData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredMachines = machines.filter(machine => {
    const fieldValue = machine[selectedOption].toString().toLowerCase();
    return fieldValue.includes(searchQuery.toLowerCase());
  });

  const handleRowClick = (machine) => {
    const customer_id = JSON.parse(localStorage.getItem('user')).customer_id;
    axios.get(`http://localhost:3006/particularCustomerMachineData/${machine.machine_id}/${customer_id}`, { withCredentials: true })
      .then(response => {
        setSelectedMachineData(response.data);
        setIsModalOpen(true);
      })
      .catch(error => {
        console.error('Error fetching machine data:', error);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMachineData(null);
  };

  return (
    <>
      <div className="listingSection">
        <div className="heading flex" style={{justifyContent: 'space-between'}}>
          <div>
            <h1>Machine Listings</h1>
          </div>
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
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Machine ID</th>
                <th>Machine Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredMachines.map((machine, index) => (
                <tr key={machine.machine_register_id} onClick={() => handleRowClick(machine)}>
                  <td>{index + 1}</td>
                  <td>{machine.machine_id}</td>
                  <td>{machine.machine_location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Machine Data Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        {isModalOpen && (
          <ParticularCustomerMachineData
            onClose={handleCloseModal}
            selectedMachineData={selectedMachineData}
          />
        )}
      </Modal>
    </>
  );
};

export default Listing;
