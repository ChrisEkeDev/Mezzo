import React from 'react'
import './button.css'

function IconButton({style, icon, action, disabled}) {
  return (
    <button onClick={action} className={`icon--button ${style} ${disabled ? 'disabled' : ''}`} type='button' disabled={disabled}>
        <span className='btn--icon'>{icon}</span>
    </button>
  )
}

export default IconButton
