import React from 'react';
import '../../../App.css';
import { FaCheckCircle } from 'react-icons/fa';

const RegisteredUserInfo = ({ newUser }) => {
    return (
        <div className="containerR">
            <div className="activitySection">
                <div className="heading flex" style={{ color: 'green', alignItems: 'center' }}>
                    <div className='flex'>
                        {newUser.user_id && <FaCheckCircle style={{ alignItems: 'center', fontSize: '50px', marginRight: '10px' }} />}
                        <h1>Recent Registered User</h1>
                    </div>
                </div>

                <div className="secContainer grid">
                    <div className="singleCustomer">
                        <div className="customerDetails flex">
                            <span className="name">Username: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <p>{newUser.username}</p>
                        </div>
                    </div>
                    <div className="singleCustomer">
                        <div className="customerDetails flex">
                            <span className="name">First Name: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <p>{newUser.first_name}</p>
                        </div>
                    </div>
                    <div className="singleCustomer">
                        <div className="customerDetails flex">
                            <span className="name">Last Name: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <p>{newUser.last_name}</p>
                        </div>
                    </div>
                    <div className="singleCustomer">
                        <div className="customerDetails flex">
                            <span className="name">Phone: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <p>{newUser.phone_number}</p>
                        </div>
                    </div>
                    <div className="singleCustomer">
                        <div className="customerDetails flex">
                            <span className="name">Email: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <p>{newUser.email}</p>
                        </div>
                    </div>
                    <div className="singleCustomer">
                        <div className="customerDetails flex">
                            <span className="name">Password: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <p>{newUser.password}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisteredUserInfo;
