import React from 'react'
import MezzoPlayer from '../mezzoPlayer';
import './nav.css';
import { useNowPlaying } from '../../context/nowPlaying'
import NavUser from './navUser';
import { TbMenu } from 'react-icons/tb';

function Nav() {
  const { setAside } = useNowPlaying();


  return (
    <nav id='nav--wrapper'>
        <span onClick={() => setAside(true)} className='nav--aside_btn'>
          <TbMenu/>
        </span>
        <MezzoPlayer/>
        <NavUser />
    </nav>
  )
}

export default Nav
