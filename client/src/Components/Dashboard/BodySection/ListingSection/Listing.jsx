import '../../../../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi'
import Activity from '../ActivitySection/Activity';
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

const Listing = ({ users }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('username');
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (users.length > 0) {
      setUserProfileData(users[0]);
    }
  }, [users]);
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

  const handleRowClick = (user) => {
    setUserProfileData(user);
    let userId = user.user_id;

    // Fetch additional user data based on userId
    axios.get(`http://localhost:3006/particularuserdata/${userId}`, { withCredentials: true })
      .then(response => {
        setIsModalOpen(true);
        setSelectedUserData(response.data); // Assuming your API response returns user data
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedUserData([]);
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
              <option value="email">Email</option>
              <option value="phone_number">Phone Number</option>
              <option value="first_name">First Name</option>
              <option value="last_name">Last Name</option>
              <option value="created_at">Created At</option>
            </select>
            <input

              type="text"
              placeholder={`Search by ${selectedOption}`}
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <BiSearchAlt className='icon' />
          </div>
        </div>
        {/* <div className=""> */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Name</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.user_id} onClick={() => handleRowClick(user)}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.first_name + ' ' + user.last_name}</td>
                  <td>{new Date(user.created_at).toISOString().split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* </div> */}
      </div >
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        {isModalOpen && (<Activity onClose={handleCloseModal} selectedUserData={selectedUserData} userProfileData={userProfileData} />)}
      </Modal>
    </>
  )
}

export default Listing