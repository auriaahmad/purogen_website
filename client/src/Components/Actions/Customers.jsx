import '../../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const CustomersListing = () => {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState('box_name');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerData, setCustomerData] = useState({});

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
          width: '30%',
          hight: '50px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }
      };

    useEffect(() => {
        axios.get('http://localhost:3006/allRegisteredCustomers', { withCredentials: true })
            .then(response => {
                const customers = response.data;
                setCustomers(customers);
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

    const filteredCustomers = customers.filter((customer) => {
        const fieldValue = customer[selectedOption].toString().toLowerCase();
        return fieldValue.includes(searchQuery.toLowerCase());
    });

    const openDeleteModal = (customer) => {
        setSelectedCustomer(customer);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedCustomer(null);
    };

    const handleDeleteCustomer = async () => {
        try {
            await axios.delete(`http://localhost:3006/deleteCustomer/${selectedCustomer.customer_id}`, { withCredentials: true });
            setCustomers(customers.filter(customer => customer.customer_id !== selectedCustomer.customer_id));
            closeDeleteModal();
            alert('Customer deleted successfully');
        } catch (error) {
            console.error('Error deleting customer:', error);
            alert('Error deleting customer');
        }
    };

    const openEditModal = (customer) => {
        setSelectedCustomer(customer);
        setCustomerData({
            box_name: customer.box_name,
            first_name: customer.first_name,
            last_name: customer.last_name,
            phone_number: customer.phone_number,
            email: customer.email
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedCustomer(null);
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setCustomerData({
            ...customerData,
            [name]: value
        });
    };

    const handleUpdateCustomer = async () => {
        try {
            await axios.put(`http://localhost:3006/editCustomer/${selectedCustomer.customer_id}`, customerData, { withCredentials: true });
            setCustomers(customers.map(customer => (customer.customer_id === selectedCustomer.customer_id ? { ...customer, ...customerData } : customer)));
            closeEditModal();
            alert('Customer updated successfully');
        } catch (error) {
            console.error('Error updating customer:', error);
            alert('Error updating customer');
        }
    };

    return (
        <div className='mainContent'>
            <div className="lisitingSection">
                <div className="heading flex">
                    <h1>Customers</h1>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer, index) => (
                                <tr key={customer.customer_id}>
                                    <td>{index + 1}</td>
                                    <td>{customer.box_name}</td>
                                    <td>{customer.first_name + ' ' + customer.last_name}</td>
                                    <td>{customer.username}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone_number}</td>
                                    <td>{new Date(customer.created_at).toISOString().split('T')[0]}</td>
                                    <td className="actions">
                                        <div className='action_buttons_container'>
                                            <button id='action_btn_edit' onClick={() => openEditModal(customer)}>Edit</button>
                                            <button id='action_btn_delete' onClick={() => openDeleteModal(customer)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} style={customStyles}>
                <div className="modal_size_action">
                    <h2>Confirm Delete</h2>
                    <br />
                    {selectedCustomer && (
                        <p>Are you sure you want to delete {selectedCustomer.username}?</p>
                    )}
                    <div className="modal-delete-buttons">
                        <button onClick={handleDeleteCustomer}>Yes</button>
                        <button onClick={closeDeleteModal}>No</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal} style={customStyles}>
                <h2>Edit Customer</h2>
                <br />
                {selectedCustomer && (
                    <form className="modal-form">
                        <label>
                            First Name:
                            <input type="text" name="first_name" value={customerData.first_name} onChange={handleEditInputChange} />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" name="last_name" value={customerData.last_name} onChange={handleEditInputChange} />
                        </label>
                        {/* <label>
                            Box Name:
                            <input type="text" name="box_name" value={customerData.box_name} onChange={handleEditInputChange} />
                        </label> */}
                        <label>
                            Phone Number:
                            <input type="text" name="phone_number" value={customerData.phone_number} onChange={handleEditInputChange} />
                        </label>
                        <label>
                            Email:
                            <input type="text" name="email" value={customerData.email} onChange={handleEditInputChange} />
                        </label>
                        <div className="modal-form-buttons">
                            <button type="button" onClick={handleUpdateCustomer}>Submit</button>
                            <button type="button" onClick={closeEditModal}>Cancel</button>
                        </div>
                    </form>
                )}
            </Modal>

        </div>
    );
};

export default CustomersListing;
