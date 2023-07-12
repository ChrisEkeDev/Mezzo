import React from 'react'
import './button.css'

function Button({label, style, left, right, action, disabled}) {
  return (
    <button onClick={action} className={`button ${style} ${disabled ? 'disabled' : ''}`} type='button' disabled={disabled}>
        <span className='btn--icon'>{left ? left : null}</span>
        <span>{label}</span>
        <span className='btn--icon'>{right ? right : null}</span>
    </button>
  )
}

export default Button
