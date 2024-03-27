import React from 'react';
import { motion } from 'framer-motion';
import { base, buttonBase } from '../../../Constants/animations';
import './styles.scss';

function Button(props) {
  const {
    label,
    styles,
    icon: Icon,
    action,
    disabled,
    animation,
    loading,
  } = props;

  return (
    <motion.button
      {...base}
      variants={animation ? animation : buttonBase}
      onClick={action}
      className={`button ${styles} ${disabled ? 'disabled' : ''}`}
      type='button'
      disabled={disabled}

    >

      {
        Icon &&
        <Icon
          className={`button--icon ${loading &&'button--loading'}`}
        />
      }

      {
        label &&
        <span>{label}</span>
      }

    </motion.button>
  )
}

export default Button
