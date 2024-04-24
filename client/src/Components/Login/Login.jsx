import React, { useEffect, useState } from 'react';
import './Login.css';
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import video from '../../Assets/video.mp4'
import logo from '../../Assets/logo.png'
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { AiOutlineSwapRight } from 'react-icons/ai'
import purogenLogo from '../../Assets/purogen.png'
import useUserStore from '../../store/store';
const Login = () => {
    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigateTo = useNavigate();
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');
    const login = useUserStore((state) => state.login);
    
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3006/signin', {
                username: loginUserName,
                password: loginPassword
            },{withCredentials: true, credentials: 'include'});
            
            // Check if the response status is 200 (OK)
            if (response.status === 200) {
                const userData = response.data;
                
                // login(userData);
                console.log("token is saving here", userData);
                login(userData);
                
               
                navigateTo('/dashboard');
            } else {
                // Handle other response status codes
                setLoginStatus('Invalid username or password');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
            setLoginStatus('Network error occurred');
        }
    };

    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder('showMessage')
            setTimeout(() => {
                setStatusHolder('message')
            }, 5000);
        }
    }, [loginStatus])

    const onSubmit = () => {
        setLoginUserName('')
        setLoginPassword('')
    }

    return (
        <div className="loginPage flex">
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

                    <form action="" className="form grid" onSubmit={onSubmit}>
                        <span className={statusHolder}>{loginStatus}</span>

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input type="text" id='username' placeholder='Enter Username'
                                    onChange={(event) => setLoginUserName(event.target.value)} />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />
                                <input type="password" id='password' placeholder='Enter Password'
                                    onChange={(event) => setLoginPassword(event.target.value)} />
                            </div>
                        </div>

                        <button type='submit' className='btn flex' onClick={loginUser}>
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
    )
}

export default Login