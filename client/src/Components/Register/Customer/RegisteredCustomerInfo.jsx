import React from 'react'
import '../../../App.css'
import { FaCheckCircle } from 'react-icons/fa';

const RegisteredCustomerInfo = ({newCustomer}) => {
    return (
        <div className="activitySection">
            <div className="heading flex" style={{ color: 'green', alignItems: 'center' }}>
                <div className='flex'>
                    {newCustomer.customer_id && <FaCheckCircle style={{ alignItems: 'center', fontSize: '50px', marginRight: '10px' }} />}
                    <h1>Resent Registered Customer</h1>
                </div>
            </div>

            <div className="secContainer grid">
                <div className="singleCustomer ">
                    <div className="customerDetails flex">
                        <span className="name">Email: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <p>{newCustomer.email}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer">
                    <div className="customerDetails flex">
                        <span className="name">User Name:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <p>{newCustomer.username}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer">
                    <div className="customerDetails flex">
                        <span className="name">Box Name:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <p>{newCustomer.box_name}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer">
                    <div className="customerDetails flex">
                        <span className="name">First Name:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <p>{newCustomer.first_name}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer">
                    <div className="customerDetails flex">
                        <span className="name">Last Name:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <p>{newCustomer.last_name}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer">
                    <div className="customerDetails flex">
                        <span className="name">Phone Number:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <p>{newCustomer.phone_number}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer">
                    <div className="customerDetails flex">
                        <span className="name">Password:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <p>{newCustomer.password}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default RegisteredCustomerInfo;