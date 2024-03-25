import React from 'react';
import { motion } from 'framer-motion';
import { base, buttonBase } from '../../../constants/animations';
import './styles.scss';

function Button({label, styles, left: LeftIcon, right: RightIcon, action, disabled, animation}) {
  return (
    <motion.button
      {...base}
      variants={animation ? animation : buttonBase}
      onClick={action}
      className={`button ${styles} ${disabled ? 'disabled' : ''}`}
      type='button'
      disabled={disabled}
    >
    { LeftIcon ? <LeftIcon className='button--icon' /> :  null }
        { label ? <span>{label}</span> : null }
    { RightIcon ? <RightIcon className='button--icon'/>: null}
    </motion.button>
  )
}

export default Button
