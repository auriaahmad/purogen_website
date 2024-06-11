import React from 'react'
import '../../../../App.css'
import { BsQuestionCircle } from 'react-icons/bs'
import img2 from '../../../../Assets/images (2).png'
import video from '../../../../Assets/video.mp4'
import useUserStore from '../../../../store/store'

const Top = ({ userCount }) => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="topSection">
      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>Welcome to PuroGen.</h1>
          {user && user.first_name && (
            <p>
              Hello <br /> <span style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '2em' }}>{user.first_name},<br /></span> Welcome back!
            </p>
          )}

          <div className="videoDiv">
            <video src={video} autoPlay loop muted></video>
          </div>
        </div>

        <div className="leftCard flex">
          <div className="main flex">

            <div className="textDiv">
              <h1>My Stat</h1>

              <div className="flex">
                <span>
                  Today <br /> <small>{userCount.currentDate} Client</small>
                </span>
                <span>
                  This Month <br /> <small>{userCount.currentMonth} Client</small>
                </span>
              </div>
            </div>

            <div className="imgDiv">
              <img src={img2} alt="Image Name" />
            </div>
            <div className="sideBarCard">
              <BsQuestionCircle className="icon" />
              <div className="cardContent">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <h3>Help Center</h3>
                <p>Having trouble in Purogen Admin Dashboard, please Email Us at oryaofficial@gmail.com</p>
                {/* <button className="btn">Go to help center</button> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Top