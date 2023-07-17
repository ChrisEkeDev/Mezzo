import React from 'react'
import MezzoPlayer from '../mezzoPlayer';
import './nav.css';
import { useNowPlaying } from '../../context/nowPlaying'
import NavUser from './navUser';
import NowPlaying from '../nowPlaying';

function Nav() {


  return (
    <nav id='nav--wrapper'>
        <MezzoPlayer/>
        {/* <NowPlaying/> */}
        <NavUser />
    </nav>
  )
}

export default Nav
