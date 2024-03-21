import React from 'react';
import './styles.scss';

function Button({label, styles, left, right, action, disabled}) {
  return (
    <button onClick={action} className={`button ${styles} ${disabled ? 'disabled' : ''} ${!left && !right ? 'centered' : 'null'}`} type='button' disabled={disabled}>
    { left ? <span className='button--icon'>{left}</span> :  null }
        { label ? <span>{label}</span> : null }
    { right ? <span className='button--icon'>{right}</span>: null}
    </button>
  )
}

export default Button
