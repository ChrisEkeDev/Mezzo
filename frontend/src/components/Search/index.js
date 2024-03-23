import React from 'react'
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import './styles.scss'
import Button from '../shared/Buttons/Button';

function Search({placeholder, action}) {
  return (
    <div className='search--wrapper'>
        <input
            className='search--input'
            placeholder={placeholder}
        />
        {/* <Button
          styles='secondary button--small'
          right={PiMagnifyingGlassBold}
          action={action}
          label="Search"
        /> */}
    </div>
  )
}

export default Search
