import React from 'react';
import { motion } from 'framer-motion';
import './styles.scss';
import { base, button } from '../../../constants/animations';


function IconButton({icon: Icon, action, styles}) {
  return (
    <motion.button
        {...base}
        variants={button}
        onClick={action}
        className={`icon_button ${styles}`}>
        <Icon className="icon"/>
    </motion.button>
  )
}

export default IconButton
