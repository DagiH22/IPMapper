import React, { useState } from 'react'
import '../styles/searchInput.css'
import arrow from '../assets/images/icon-arrow.svg'

function SearchInput({onSearch}) {
  const [inputval,setInputval]=useState()
  function handleSearch ()
  {
   if( inputval.trim() ) onSearch(inputval)
  }
  return (
    <div className='searchBar'>
        <div className='searchInput'>
            <input type="text" name="ipInput" id="ipInput" placeholder='Search for any IP address or domain' onChange={ e => setInputval(e.target.value)}/>
        </div>
        <div className='btnContainer'>
            <button className="goBtn"><img src={arrow} alt="right arrow" onClick={handleSearch}/></button>
        </div>

    </div>
  )
}

export default SearchInput