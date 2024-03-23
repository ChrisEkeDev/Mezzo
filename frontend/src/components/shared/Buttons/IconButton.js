import React from 'react';
import { motion } from 'framer-motion';
import { base, button } from '../../../constants/animations';
import './styles.scss';


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
