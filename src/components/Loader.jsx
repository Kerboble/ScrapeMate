import React from 'react'
import icon from "../assets/scraper(3).png"

function Loader() {
  return (
    <div className="loader">
        <img  className="loader-icon" src={icon} alt="" /><p className='interval-message'></p>
    </div>
  )
}

export default Loader