import React from 'react';
import '../../../App.css';
import { FaCheckCircle } from 'react-icons/fa';

const RegisteredMachineInfo = ({ newMachine }) => {
    return (
        <div className="containerR">
            <div className="activitySection">
                <div className="heading flex" style={{ color: 'green', alignItems: 'center' }}>
                    <div className='flex'>
                        {newMachine.machine_id && <FaCheckCircle style={{ alignItems: 'center', fontSize: '50px', marginRight: '10px' }} />}
                        <h1>Recent Registered Machine</h1>
                    </div>
                </div>

                <div className="secContainer grid">

                    <>
                        <div className="singleCustomer">
                            <div className="customerDetails flex">
                                <span className="name">ID: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <p>{newMachine.machine_id}</p>
                            </div>
                        </div>
                        <div className="singleCustomer">
                            <div className="customerDetails flex">
                                <span className="name">Location: &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <p>{newMachine.machine_location}</p>
                            </div>
                        </div>
                    </>

                </div>
            </div>
        </div>
    );
};

export default RegisteredMachineInfo;