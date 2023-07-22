import React from 'react'
import './submit.css'

const Submit = ({myref , lat1 , lng1 , lat2 , lng2 , generateRandomPoint }) => {
    

  return (
    <div className = "absolute w-[100%] h-[100%] bg-[#000000a8] z-10">
        <div id="submitMapContainer" ref={myref}></div>
        <button id="generateButton" onClick={generateRandomPoint}>Generate Random Point</button>
    </div>
  )
}


export default Submit