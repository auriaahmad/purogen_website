import React from 'react'
import '../../../App.css'
import purogenLogo from '../../../Assets/purogen_horizontal.png'
import { IoMdSpeedometer } from 'react-icons/io'
import { MdDeliveryDining, MdOutlineExplore, MdOutlinePermContactCalendar } from 'react-icons/md'
import { BsTrophy, BsCreditCard2Front, BsQuestionCircle } from 'react-icons/bs'
import { AiOutlinePieChart } from 'react-icons/ai'
import { BiTrendingUp, BiLogOutCircle } from 'react-icons/bi'
import Body from '../BodySection/Body'
import Activity from '../BodySection/ActivitySection/Activity'
import RegisterCustomer from '../../Register/Customer/RegisterCustomer'
import RegisterMachine from '../../Register/Machine/RegisterMachine'
import RegisterUser from '../../Register/User/RegisterUser'

import { useState } from 'react'

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="dashboard flex">
      <div className="dashboardContainer flex">
        <div className='sideBar grid'>

          <div className="logoDiv flex">
            <img src={purogenLogo} alt="Logo" />
          </div>

          <div className="menuDiv">
            <h3 className="divTitle">
              QUICK MENU
            </h3>
            <ul className="menuLists grid">

              <li className="listItem">
                <a onClick={() => handleTabClick('dashboard')} className="menuLink flex">
                  <IoMdSpeedometer className="icon" />
                  <span className="smallText">
                    Dashboard
                  </span>
                </a>
              </li>

              <li className="listItem">
                <a onClick={() => handleTabClick('customer')} className="menuLink flex">
                  <MdDeliveryDining className="icon" />
                  <span className="smallText">
                    Reg. Customer
                  </span>
                </a>
              </li>

              <li className="listItem">
                <a onClick={() => handleTabClick('machine')} className="menuLink flex">
                  <MdDeliveryDining className="icon" />
                  <span className="smallText">
                    Reg. Machine
                  </span>
                </a>
              </li>

              <li className="listItem">
                <a onClick={() => handleTabClick('user')} className="menuLink flex">
                  <MdDeliveryDining className="icon" />
                  <span className="smallText">
                    Reg. User
                  </span>
                </a>
              </li>
            </ul>
          </div>


          <div className="settingsDiv">
            <h3 className="divTitle">
              SETTINGS
            </h3>
            <ul className="menuLists grid">
              <li className="listItem">
                <a href="/" className="menuLink flex">
                  <BiLogOutCircle className="icon" />
                  <span className="smallText">
                    Log Out
                  </span>
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
              {/* <button className="btn">Go to help center</button> */}

            </div>
          </div>
        </div>


        {activeTab === 'dashboard' && <Body />}
        {activeTab === 'customer' && <RegisterCustomer />}
        {activeTab === 'machine' && <RegisterMachine />} 
        {activeTab === 'user' && <RegisterUser />} 
      </div>
    </div>
  )
}

export default Sidebar