import React from 'react'
import '../../../App.css'

const RegisteredCustomerInfo = ({newCustomer}) => {
    return (
        <div className="activitySection">
            <div className="heading flex">
                <h1>Resent Registered Customer</h1>
            </div>

            <div className="secContainer grid">
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Email :</span>
                        <p>{newCustomer.email}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">User Name :</span>
                        <p>{newCustomer.username}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Box Name :</span>
                        <p>{newCustomer.box_name}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">First Name :</span>
                        <p>{newCustomer.first_name}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Last Name :</span>
                        <p>{newCustomer.last_name}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Phone Number :</span>
                        <p>{newCustomer.phone_number}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Password :</span>
                        <p>{newCustomer.password}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default RegisteredCustomerInfo;