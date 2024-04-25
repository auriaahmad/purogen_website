import React from 'react'
import '../Dashboard/BodySection/ActivitySection/activity.css'

const RegisteredUserInfo = () => {
    return (
        <div className="activitySection">
            <div className="heading flex">
                <h1>Resent Registered User</h1>
            </div>

            <div className="secContainer grid">
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Email</span>
                        <p>a@b.customerDetails</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">User Name</span>
                        <p>auria</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">First Name</span>
                        <p>auria</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Last Name</span>
                        <p>auria</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Phone Number</span>
                        <p>auria</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Password</span>
                        <p>auria</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Admin:</span>
                        <p>Yes</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Created At:</span>
                        <p>12/06/2024</p>
                    </div>
                    
                </div>
            </div>
        </div>

    )
}

export default RegisteredUserInfo;