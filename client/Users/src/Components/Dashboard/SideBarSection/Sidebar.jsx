import React, { useState, useEffect } from 'react';
import '../../../App.css';
import purogenLogo from '../../../Assets/purogen_horizontal.png';
import { IoMdSpeedometer } from 'react-icons/io';
import { BsQuestionCircle } from 'react-icons/bs';
import { BiLogOutCircle } from 'react-icons/bi';
import Body from '../BodySection/Body';
import useUserStore from '../../../store/store';
import axios from 'axios';
const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'dashboard');
  const [isActionOpen, setIsActionOpen] = useState(false);
  const logout = useUserStore(state => state.logout); 

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleVisualizeClick = () => {
    setIsActionOpen(!isActionOpen);
  };

  const handleLogout = async () => {
    try {
      // Get the admin session ID from local storage
      const user_session_id = JSON.parse(localStorage.getItem('user')).user_session_id;

      // Make a POST request to the logout endpoint
      await axios.post('http://localhost:3006/logout/user', { user_session_id });

      // Call the logout function from the user store to clear user data
      logout();

      // Redirect to the dashboard after logout
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="dashboard flex">
      <div className="dashboardContainer flex">
        <div className='sideBar grid'>
          <div className="logoDiv flex">
            <img src={purogenLogo} alt="Logo" />
          </div>

          <div className="menuDiv">
            <h3 className="divTitle">QUICK MENU</h3>
            <ul className="menuLists grid">
              <li className={`listItem ${activeTab === 'dashboard' ? 'active' : ''}`}>
                <a onClick={() => handleTabClick('dashboard')} className="menuLink flex">
                  <IoMdSpeedometer className="icon" />
                  <span className="smallText">Dashboard</span>
                </a>
              </li>
              
              {/* <li className={`listItem ${activeTab === 'assignment_machines_users' ? 'active' : ''}`}>
                <a onClick={() => handleTabClick('assignment_machines_users')} className="menuLink flex">
                  <IoMdSpeedometer className="icon" />
                  <span className="smallText">Assign/UnAssing Machines</span>
                </a>
              </li> */}

              {/* <li className="listItem">
                <a onClick={handleVisualizeClick} className="menuLink flex">
                  {isActionOpen ? <CiSquareMinus className="icon" style={{ color: 'green' }}/> : <CiSquarePlus className="icon" style={{ color: 'green' }}/>}
                  <span className="smallText" style={{ color: 'green' }}>Actions Edit/Delete</span>
                </a>
              </li> */}

              {/* {isActionOpen && (
                <ul className="menuLists grid" style={{ paddingLeft: '20px' }}>

                  <li className={`listItem ${activeTab === 'visualizeMachinesListing' ? 'active' : ''}`}>
                    <a onClick={() => handleTabClick('visualizeMachinesListing')} className="menuLink flex">
                      <MdDeliveryDining className="icon" />
                      <span className="smallText">Edt/Del. Machines</span>
                    </a>
                  </li>

                  <li className={`listItem ${activeTab === 'visualizeUsersListing' ? 'active' : ''}`}>
                    <a onClick={() => handleTabClick('visualizeUsersListing')} className="menuLink flex">
                      <MdDeliveryDining className="icon" />
                      <span className="smallText">Edt/Del. Users</span>
                    </a>
                  </li>
                </ul>
              )} */}
            </ul>
          </div>

          <div className="settingsDiv">
            <h3 className="divTitle">SETTINGS</h3>
            <ul className="menuLists grid">
              <li className="listItem">
                {/* Include the logout functionality */}
                <div onClick={handleLogout} className="menuLink flex">
                  <BiLogOutCircle className="icon" />
                  <span className="smallText">Log Out</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="sideBarCard">
            <BsQuestionCircle className="icon" />
            <div className="cardContent">
              <div className="circle1"></div>
              <div className="circle2"></div>
              <h3>Help Center</h3>
              <p>Having trouble in DashBoard, please contact Purogen IT Office from for more questions.</p>
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' && <Body />}
        {/* {activeTab === 'visualizeMachinesListing' && <MachinesListing />} */}
        {/* {activeTab === 'visualizeUsersListing' && <UsersListing />} */}
        {/* {activeTab === 'assignment_machines_users' && <AssignmentMachineUser />}   */}
      </div>
    </div>
  );
};

export default Sidebar;