import React from 'react'
import './button.css'

function Button({label, style, left, right, action, disabled}) {
  return (
    <button onClick={action} className={`button ${style} ${disabled ? 'disabled' : ''}`} type='button' disabled={disabled}>
        { left ? <span className='btn--icon'>{left}</span> :  null }
        { label ? <span>{label}</span> : null }
        { right ? <span className='btn--icon'>{right}</span>: null}
    </button>
  )
}

export default Button
