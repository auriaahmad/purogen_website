import React, { useState, useEffect } from 'react';
import '../../../App.css';
import purogenLogo from '../../../Assets/purogen_horizontal.png';
import { IoMdSpeedometer } from 'react-icons/io';
import { MdDeliveryDining } from 'react-icons/md';
import { BsQuestionCircle } from 'react-icons/bs';
import { BiLogOutCircle } from 'react-icons/bi';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import Body from '../BodySection/Body';
import RegisterCustomer from '../../Register/Customer/RegisterCustomer';
import RegisterMachine from '../../Register/Machine/RegisterMachine';
import RegisterUser from '../../Register/User/RegisterUser';
import CustomersListing from '../../Actions/Customers';
import MachinesListing from '../../Actions/Machines';
import UsersListing from '../../Actions/Users';
import AssignmentMachineUser from '../../AssignmentMU/UserMachineAssignment';
const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'dashboard');
  const [isRegistrationsOpen, setIsRegistrationsOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRegistrationsClick = () => {
    setIsRegistrationsOpen(!isRegistrationsOpen);
  };

  const handleVisualizeClick = () => {
    setIsActionOpen(!isActionOpen);
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

              <li className="listItem">
                <a onClick={handleRegistrationsClick} className="menuLink flex">
                  {isRegistrationsOpen ? <CiSquareMinus className="icon" style={{ color: 'green' }}/> : <CiSquarePlus className="icon" style={{ color: 'green' }}/>}
                  <span className="smallText" style={{color: 'green'}} >Registrations</span>
                </a>
              </li>

              {isRegistrationsOpen && (
                <ul className="menuLists grid" style={{ paddingLeft: '20px' }}>
                  <li className={`listItem ${activeTab === 'customer' ? 'active' : ''}`}>
                    <a onClick={() => handleTabClick('customer')} className="menuLink flex">
                      <MdDeliveryDining className="icon" />
                      <span className="smallText">Reg. Customer</span>
                    </a>
                  </li>

                  <li className={`listItem ${activeTab === 'machine' ? 'active' : ''}`}>
                    <a onClick={() => handleTabClick('machine')} className="menuLink flex">
                      <MdDeliveryDining className="icon" />
                      <span className="smallText">Reg. Machine</span>
                    </a>
                  </li>

                  <li className={`listItem ${activeTab === 'user' ? 'active' : ''}`}>
                    <a onClick={() => handleTabClick('user')} className="menuLink flex">
                      <MdDeliveryDining className="icon" />
                      <span className="smallText">Reg. User</span>
                    </a>
                  </li>
                </ul>
              )}
              
              <li className={`listItem ${activeTab === 'assignment_machines_users' ? 'active' : ''}`}>
                <a onClick={() => handleTabClick('assignment_machines_users')} className="menuLink flex">
                  <IoMdSpeedometer className="icon" />
                  <span className="smallText">Assign/UnAssing Machines</span>
                </a>
              </li>

              <li className="listItem">
                <a onClick={handleVisualizeClick} className="menuLink flex">
                  {isActionOpen ? <CiSquareMinus className="icon" style={{ color: 'green' }}/> : <CiSquarePlus className="icon" style={{ color: 'green' }}/>}
                  <span className="smallText" style={{ color: 'green' }}>Actions Edit/Delete</span>
                </a>
              </li>

              {isActionOpen && (
                <ul className="menuLists grid" style={{ paddingLeft: '20px' }}>
                  <li className={`listItem ${activeTab === 'VisualiazeCustomersListing' ? 'active' : ''}`}>
                    <a onClick={() => handleTabClick('VisualiazeCustomersListing')} className="menuLink flex">
                      <MdDeliveryDining className="icon" />
                      <span className="smallText">Edt/Del. Customers</span>
                    </a>
                  </li>

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
              )}
            </ul>
          </div>

          <div className="settingsDiv">
            <h3 className="divTitle">SETTINGS</h3>
            <ul className="menuLists grid">
              <li className="listItem">
                <a href="/" className="menuLink flex">
                  <BiLogOutCircle className="icon" />
                  <span className="smallText">Log Out</span>
                </a>
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
        {activeTab === 'customer' && <RegisterCustomer />}
        {activeTab === 'machine' && <RegisterMachine />}
        {activeTab === 'user' && <RegisterUser />}
        {activeTab === 'VisualiazeCustomersListing' && <CustomersListing />}
        {activeTab === 'visualizeMachinesListing' && <MachinesListing />}
        {activeTab === 'visualizeUsersListing' && <UsersListing />}
        {activeTab === 'assignment_machines_users' && <AssignmentMachineUser />}  
      </div>
    </div>
  );
};

export default Sidebar;