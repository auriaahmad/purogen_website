import '../../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const UsersListing = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState('username');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userData, setUserData] = useState({});

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            zIndex: 1000 
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '80%',
            width: '30%',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }
    };

    useEffect(() => {
        const customer_id = JSON.parse(localStorage.getItem('user')).customer_id;
        axios.get(`http://localhost:3006/particularCustomerAllUsers/${customer_id}`, { withCredentials: true })
            .then(response => {
                const users = response.data;
                setUsers(users);
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

    const filteredUsers = users.filter((user) => {
        const fieldValue = user[selectedOption].toString().toLowerCase();
        return fieldValue.includes(searchQuery.toLowerCase());
    });

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`http://localhost:3006/deleteUser/${selectedUser.user_id}`, { withCredentials: true });
            setUsers(users.filter(user => user.user_id !== selectedUser.user_id));
            closeDeleteModal();
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setUserData({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleUpdateUser = async () => {
        try {
            await axios.put(`http://localhost:3006/editUser/${selectedUser.user_id}`, userData, { withCredentials: true });
            setUsers(users.map(user => (user.user_id === selectedUser.user_id ? { ...user, ...userData } : user)));
            closeEditModal();
            alert('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user');
        }
    };

    return (
        <div className='mainContent'>
            <div className="lisitingSection">
                <div className="heading flex">
                    <h1>Users</h1>
                    <div className="searchBar">
                        <label htmlFor="searchOptions">Search By:</label>
                        <select id="searchOptions" value={selectedOption} onChange={handleSelectChange}>
                            <option value="username">User Name</option>
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
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>User Name</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user.user_id}>
                                    <td>{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.first_name + ' ' + user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{new Date(user.created_at).toISOString().split('T')[0]}</td>
                                    <td className="actions">
                                        <div className='action_buttons_container'>
                                            <button id='action_btn_edit' onClick={() => openEditModal(user)}>Edit</button>
                                            <button id='action_btn_delete' onClick={() => openDeleteModal(user)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Delete User Modal */}
            <Modal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} style={customStyles}>
                <div className="modal_size_action">
                    <h2>Confirm Delete</h2>
                    <br />
                    {selectedUser && (
                        <p>Are you sure you want to delete {selectedUser.username}?</p>
                    )}
                    <div className="modal-delete-buttons">
                        <button onClick={handleDeleteUser}>Yes</button>
                        <button onClick={closeDeleteModal}>No</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal} style={customStyles}>
                <h2>Edit User</h2>
                <br />
                {selectedUser && (
                    <form className="modal-form">
                        <label>
                            First Name:
                            <input type="text" name="first_name" value={userData.first_name} onChange={handleEditInputChange} />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" name="last_name" value={userData.last_name} onChange={handleEditInputChange} />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={userData.email} onChange={handleEditInputChange} />
                        </label>
                        <label>
                            Phone Number:
                            <input type="text" name="phone_number" value={userData.phone_number} onChange={handleEditInputChange} />
                        </label>
                        <div className="modal-form-buttons">
                            <button type="button" onClick={handleUpdateUser}>Submit</button>
                            <button type="button" onClick={closeEditModal}>Cancel</button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default UsersListing;
