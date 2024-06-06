import '../../../../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi'
import MachineList from '../ActivitySection/MachineListingActivity';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity to your preference
    zIndex: 1000 // Ensure the modal is on top of other elements
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  }
};

const Listing = ({ customers }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('username');
  const [selectedCustomerMachines, setSelectedCustomerMachines] = useState([]);
  const [customerProfileData, setcustomerProfileData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (customers.length > 0) {
      setcustomerProfileData(customers[0]);
    }
  }, [customers]);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const filteredcustomers = customers.filter(customer => {
    const fieldValue = customer[selectedOption].toString().toLowerCase();
    return fieldValue.includes(searchQuery.toLowerCase());
  });

  const handleRowClick = (customer) => {
    setcustomerProfileData(customer);
    let customerId = customer.customer_id;

    // Fetch additional customer data based on customerId
    axios.get(`http://localhost:3006/particularCustomerMachine/${customerId}`, { withCredentials: true })
      .then(response => {
        setIsModalOpen(true);
        console.log(response.data);
        setSelectedCustomerMachines(response.data); // Assuming your API response returns customer data
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedCustomerMachines([]);
  };
  return (
    <>
      <div className="lisitingSection">
        <div className="heading flex">
          <h1>Client Listings</h1>
          <div className="searchBar">
            <label htmlFor="searchOptions">Search By:</label>
            <select id="searchOptions" value={selectedOption} onChange={handleSelectChange}>
              <option value="username">User Name</option>
              <option value="box_name">Box Name</option>
              <option value="email">Email</option>
              <option value="phone_number">Phone Number</option>
            </select>
            <input

              type="text"
              placeholder={`Type...`}
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
        {/* <div className=""> */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Box Name</th>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredcustomers.map((customer, index) => (
                <tr key={customer.customer_id} onClick={() => handleRowClick(customer)}>
                  <td>{index + 1}</td>
                  <td>{customer.box_name}</td>
                  <td>{customer.first_name + ' ' + customer.last_name}</td>
                  <td>{customer.username}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone_number}</td>
                  <td>{new Date(customer.created_at).toISOString().split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div >
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        {isModalOpen && (<MachineList onClose={handleCloseModal} selectedCustomerMachines={selectedCustomerMachines} customerProfileData={customerProfileData} />)}
      </Modal>
    </>
  )
}

export default Listing