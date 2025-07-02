import React from 'react'
import '../styles/searchInput.css'
import arrow from '../assets/images/icon-arrow.svg'

function SearchInput() {
  return (
    <div className='searchBar'>
        <div className='searchInput'>
            <input type="text" name="ipInput" id="ipInput" placeholder='Search for any IP address or domain' />
        </div>
        <div className='btnContainer'>
            <button className="goBtn"><img src={arrow} alt="right arrow"/></button>
        </div>

    </div>
  )
}

export default SearchInput