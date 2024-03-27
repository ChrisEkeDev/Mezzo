import React from 'react'
import mezzo from '../../assets/mezzo-color.svg'
import { useApp } from '../../Context/AppContext'
import * as ROUTES from '../../Constants/routes'
import { motion } from 'framer-motion'
import { base, swell } from '../../Constants/animations';
import './styles.scss';

function Header() {
  const { navigate } = useApp();

  return (
    <header className='header--wrapper'>
        <motion.img
          {...base}
          variants={swell}
          onClick={() => navigate(ROUTES.NOW_PLAYING)}
          className='header--logo' src={mezzo}
        />
    </header>
  )
}

export default Header
