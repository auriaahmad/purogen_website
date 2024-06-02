import '../../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi';

const CustomersListing = () => {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState('username');
    const [customerProfileData, setCustomerProfileData] = useState([]);

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



    useEffect(() => {
        if (customers.length > 0) {
            setCustomerProfileData(customers[0]);
        }
    }, [customers]);

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

    return (
        <div className="bottom flex">
            <div className="CustomersListingSection">
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
                        <BiSearchAlt className="icon" />
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
                                    <td>
                                        <button onClick={() => console.log('Edit', customer.customer_id)}>Edit</button>
                                        <button onClick={() => console.log('Delete', customer.customer_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomersListing;
