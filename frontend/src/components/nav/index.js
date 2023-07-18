import React from 'react'
import MezzoPlayer from '../mezzoPlayer';
import './nav.css';
import { useNowPlaying } from '../../context/nowPlaying'
import NavUser from './navUser';

function Nav() {


  return (
    <nav id='nav--wrapper'>
        <MezzoPlayer/>
        <NavUser />
    </nav>
  )
}

export default Nav
