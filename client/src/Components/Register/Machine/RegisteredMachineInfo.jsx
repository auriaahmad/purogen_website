import React from 'react'
import '../../../App.css'

const RegisteredMachineInfo = ({newMachine}) => {
    return (
        <div className="activitySection">
            <div className="heading flex">
                <h1>Resent Registered Machine</h1>
            </div>

            <div className="secContainer grid">
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Machine ID :</span>
                        <p>{newMachine.machine_id}</p>
                    </div>
                    
                </div>
                <div className="singleCustomer flex">
                    <div className="customerDetails">
                        <span className="name">Machine Location :</span>
                        <p>{newMachine.machine_location}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default RegisteredMachineInfo;