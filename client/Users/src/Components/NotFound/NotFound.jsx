import React from 'react'
import '../../App.css'
import video from '../../Assets/video.mp4'

const NotFound = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f8f9fa'
        }}>
            <div className="topSection">
                <div className="cardSection ">
                    <div className="rightCard flex">    
                        <p style={{ alignSelf: 'center' }}>
                            <span style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '2em' }}>404 Not Found<br /></span>
                        </p>
                        <h1 style={{ alignSelf: 'center' }}>Page you are looking for is not found</h1>
                        <div className="videoDiv">
                            <video src={video} autoPlay loop muted></video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
