import React from 'react'
import mezzo from '../../assets/mezzo-color.svg'
import { useApp } from '../../context/AppContext'
import * as ROUTES from '../../constants/routes'
import { motion } from 'framer-motion'
import { base, swell } from '../../constants/animations';
import './styles.scss';

function Header() {
  const { navigate } = useApp();

  return (
    <header className='header--wrapper'>
        <motion.img
          {...base}
          variants={swell}
          onClick={() => navigate(ROUTES.WELCOME)}
          className='header--logo' src={mezzo}
        />
    </header>
  )
}

export default Header
