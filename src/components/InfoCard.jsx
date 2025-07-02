import React from 'react'
import '../styles/infoCard.css'

function InfoCard() {
  return (
    <section className='infoContainer'>
        <div className='ipAddress'>
            <h4>IP ADDRESS</h4>
            <p>192.212.174.101</p>
        </div>
        <div className='location'>
            <h4>LOCATION</h4>
            <p>Brooklyn,NY 10001</p>
        </div>
        <div className='timezone'>
            <h4>TIMEZONE</h4> 
            <p>UTC -05:00</p>
        </div>
        <div className='isp'>
            <h4>ISP</h4>
            <p>SpaceX StarLink</p>
        </div>
    </section>
  )
}

export default InfoCard