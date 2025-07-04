import React from 'react'
import '../styles/infoCard.css'
import { useState,useEffect } from "react";
// import api from '../services/api.js';



function InfoCard(data) {

  return (
    <section className='infoContainer'>
        <div className='ipAddress'>
            <h4>IP ADDRESS</h4>
            <p>{data.ip}</p>
        </div>
        <div className='location'>
            <h4>LOCATION</h4>
            <p>{data.location.region}</p>
        </div>
        <div className='timezone'>
            <h4>TIMEZONE</h4> 
            <p>{data.location.timezone}</p>
        </div>
        <div className='isp'>
            <h4>ISP</h4>
            <p>{data.isp}</p>
        </div>
    </section>
  )
}

export default InfoCard
// <>
//     <div>
//         <ul>
//             { 
//             data.map((da)=>{
//                 return <li key={da.id}>{da.name}</li>
//             })}
//         </ul>
//     </div>
// </>