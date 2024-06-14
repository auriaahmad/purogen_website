import React from 'react'
import '../../../../App.css'
import video from '../../../../Assets/video.mp4'
import useUserStore from '../../../../store/store'

const Top = () => {
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
      </div>
    </div>
  )
}

export default Top