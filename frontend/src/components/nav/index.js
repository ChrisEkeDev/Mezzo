import React from 'react'
import './nav.css';
import { useNowPlaying } from '../../context/nowPlaying'
import NavUser from './navUser';
import NowPlaying from '../nowPlaying';

function Nav() {


  return (
    <nav id='nav--wrapper'>
        <NowPlaying/>
        <NavUser />
    </nav>
  )
}

export default Nav
