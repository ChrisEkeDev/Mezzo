import React from 'react'
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import './styles.scss'

function Search() {
  return (
    <div className='search--wrapper'>
        <input
            className='search--input'
            placeholder='Search Library'
        />
        <PiMagnifyingGlassBold  className='search--icon'/>
    </div>
  )
}

export default Search
