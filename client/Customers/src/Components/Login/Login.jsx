import React, { useState } from 'react';
import './Login.css';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import video from '../../Assets/video.mp4';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import purogenLogo from '../../Assets/purogen.png';
import useUserStore from '../../store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigateTo = useNavigate();
    const login = useUserStore((state) => state.login);
    axios.defaults.withCredentials = true;

    const loginUser = async (e) => {
        e.preventDefault();
        
        // Reset errors
        setUsernameError(false);
        setPasswordError(false);

        // Check if fields are empty
        if (!loginUserName.trim()) {
            setUsernameError(true);
            toast.error('Username cannot be empty');
            return;
        }

        if (!loginPassword.trim()) {
            setPasswordError(true);
            toast.error('Password cannot be empty');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3006/signin/customer', {
                username: loginUserName,
                password: loginPassword
            });

            if (response.status === 200) {
                const userData = response.data;
                console.log("login");
                console.log("login");
                console.log(userData);
                login(userData);                
                // Show success toast and navigate to dashboard after successful login
                toast.success('Login successful! Redirecting...');
                setTimeout(() => {
                    navigateTo('/dashboard');
                }, 2000); // Wait for 2 seconds before redirecting
            } else {
                // Handle other response status codes
                toast.error('Invalid username or password');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
            toast.error('Invalid Username or Password');
        }
    };

    return (
        <div className="loginPage flex">
            <ToastContainer />
            <div className="container flex">
                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>
                    <div className="textDiv">
                        <img src={purogenLogo} alt="Purogen Logo" />
                        <h2 className="title">THE SCIENCE OF PURE!</h2>
                        <p>TECHNOLOGY WORKING FOR YOU</p>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={purogenLogo} alt="Logo Image" />
                        <h3>Welcome Back!</h3>
                    </div>

                    <form className="form grid" onSubmit={loginUser}>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className={`input flex ${usernameError ? 'error' : ''}`}>
                                <FaUserShield className="icon" />
                                <input 
                                    type="text" 
                                    id='username' 
                                    placeholder='Enter Username'
                                    onChange={(event) => setLoginUserName(event.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className={`input flex ${passwordError ? 'error' : ''}`}>
                                <BsFillShieldLockFill className="icon" />
                                <input 
                                    type="password" 
                                    id='password' 
                                    placeholder='Enter Password'
                                    onChange={(event) => setLoginPassword(event.target.value)} 
                                />
                            </div>
                        </div>

                        <button type='submit' className='btn flex'>
                            <span>Login</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>

                        <span className="forgotPassword">
                            Forgot your password? <a href="">Click Here</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;