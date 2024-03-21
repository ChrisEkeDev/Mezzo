import React from 'react'
import mezzo from '../../assets/mezzo-color.svg'
import { motion } from 'framer-motion'
import { base, swell } from '../../constants/animations';
import './styles.scss';

function Header() {
  return (
    <header className='header--wrapper'>
        <motion.img
          {...base}
          variants={swell}
          className='header--logo' src={mezzo}
        />
    </header>
  )
}

export default Header
