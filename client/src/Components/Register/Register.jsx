import React, { useState } from 'react';
import './Register.css';
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'
import axios from 'axios';
import video from '../../Assets/video.mp4'
import logo from '../../Assets/logo.png'
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { AiOutlineSwapRight } from 'react-icons/ai'
import { MdMarkEmailRead } from 'react-icons/md'
import purogenLogo from '../../Assets/purogen.png'



const Register = () => {
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [admin, setAdmin] = useState(false);
    const navigateTo = useNavigate();



    const createUser = async (e) => {
        console.log("here create user");
        e.preventDefault();
        try {
            await axios.post('http://localhost:3006/registerUser', {
                email: email,
                username: userName,
                password: password,
                first_name: firstname,
                last_name: lastname,
                phone_number: phoneNumber,
                admin: admin
            });

            // Assuming navigateTo, setEmail, setUserName, and setPassword are properly defined
            // navigateTo('/');
            setEmail('');
            setUserName('');
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
                        <img src={purogenLogo} alt="Purogen Logo" />
                        <h2 className="title">Create New Users Here!</h2>
                        <p>Assign Roles As Admin or Client!</p>

                    </div>

                    {/* <div className="footerDiv flex">
                        <span className="text">Have an account?</span>
                        <Link to={'/'}>
                            <button className="btn">Login</button>
                        </Link>
                    </div> */}
                </div>

                <div className="formDiv flex">
                    {/* <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Let Us Know You!</h3>
                    </div> */}

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

                        <div className=" inputDiv__radio">
                            <label>Role</label>
                            <div className="input flex">
                                <input
                                    type="radio"
                                    id="admin"
                                    name="role"
                                    value="admin"
                                    checked={admin === true}
                                    onChange={() => setAdmin(true)}
                                />
                                <label htmlFor="admin">Admin</label>
                                <input
                                    type="radio"
                                    id="client"
                                    name="role"
                                    value="client"
                                    checked={admin === false}
                                    onChange={() => setAdmin(false)}
                                />
                                <label htmlFor="client">Client</label>
                            </div>
                        </div>


                        <button type='submit' className='btn flex' onClick={createUser}>
                            <span>Register</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>

                        {/* <span className="forgotPassword">
                            Forgot your password? <a href="">Click Here</a>
                        </span> */}

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Register;