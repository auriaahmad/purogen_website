import React from 'react'
import '../../App.css'

const RegisteredUserInfo = ({newUser}) => {
    return (
        <div className="activitySection">
            <div className="heading flex">
                <h1>Resent Registered User</h1>
            </div>

            <div className="secContainer grid">
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Email :</span>
                        <p>{newUser.email}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">User Name :</span>
                        <p>{newUser.username}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">First Name :</span>
                        <p>{newUser.first_name}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Last Name :</span>
                        <p>{newUser.last_name}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Phone Number :</span>
                        <p>{newUser.phone_number}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Password :</span>
                        <p>{newUser.password}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Admin :</span>
                        <p>{newUser.admin?'Yes':'No'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisteredUserInfo;