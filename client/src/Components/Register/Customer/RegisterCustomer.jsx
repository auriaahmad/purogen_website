import React, { useState } from 'react';
import '../../../App.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import video from '../../../Assets/video.mp4'
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { AiOutlineSwapRight } from 'react-icons/ai'
import { MdMarkEmailRead } from 'react-icons/md'
import purogenLogo from '../../../Assets/purogen.png'
import RegisteredCustomerInfo from './RegisteredCustomerInfo';


const RegisterCustomer = () => {
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [boxName, setBoxName] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [admin, setAdmin] = useState(false);
    const [newRegCustomer, setNewRegCustomer] = useState({});

    const createCustomer = async (e) => {
        console.log("here create user");
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3006/customerReg', {
                email: email,
                username: userName,
                box_name: boxName,
                password: password,
                first_name: firstname,
                last_name: lastname,
                phone_number: phoneNumber,
                admin: admin
            });
            console.log("Response:", response.data);
            setNewRegCustomer(response.data.user);
            setEmail('');
            setUserName('');
            setBoxName('');
            setPassword('');
            setFirstname('');
            setLastname('');
            setPhoneNumber('');
            setAdmin(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="registerPage flex">
            <div className="container flex">

                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>
                    <div className="textDiv">
                        <br />
                        <img src={purogenLogo} alt="Purogen Logo" />
                        <br />
                        <h2 className="title">Register a Customer Here!</h2>
                    </div>
                </div>

                <div className="formDiv flex">
                    <form action="" className="form grid">

                        <div className="inputDiv">
                            <br />
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className="icon" />
                                <input type="email" id='email' placeholder='Enter Email'
                                    onChange={(event) => setEmail(event.target.value)} />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="text" id='username' placeholder='Enter Username'
                                    onChange={(event) => setUserName(event.target.value)} />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="boxname">Box Name</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="text" id='boxname' placeholder='Enter Box Name'
                                    onChange={(event) => setBoxName(event.target.value)} />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="firstname">First Name</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="text" id='firstname' placeholder='Enter First Name'
                                    onChange={(event) => setFirstname(event.target.value)} />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="lastname">Last Name</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="text" id='lastname' placeholder='Enter Last Name'
                                    onChange={(event) => setLastname(event.target.value)} />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="text" id='phoneNumber' placeholder='Enter Phone Number'
                                    onChange={(event) => setPhoneNumber(event.target.value)} />
                            </div>
                        </div>


                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />
                                <input type="password" id='password' placeholder='Enter Password'
                                    onChange={(event) => setPassword(event.target.value)} />
                            </div>
                        </div>

                        <button type='submit' className='btn flex' onClick={createCustomer}>
                            <span>Register</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>
                    </form>
                </div>
            </div>
            <RegisteredCustomerInfo newCustomer={newRegCustomer}/>
        </div>
    )
}

export default RegisterCustomer;