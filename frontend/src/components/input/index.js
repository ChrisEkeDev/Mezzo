import React from 'react';
import { useState } from 'react';
import './input.css';
import { TbExclamationCircle, TbEye, TbEyeOff } from 'react-icons/tb';


function Input({name, label, placeholder, type, error, value, setValue, disabled}) {
  const [ passwordHidden, setPasswordHidden ] = useState(true);

  return (
    <label htmlFor={name} className="input--wrapper">
      {
        type === 'textarea' ?
        <textarea
          id={name}
          name={name}
          defaultValue={value}
          onChange={(x) => setValue(x.target.value)}
          disabled={disabled}
          className={`input--textarea ${error ? 'input--error' : ''}`}>
        </textarea> :
        <input
          id={name}
          name={name}
          defaultValue={value}
          onChange={(x) => setValue(x.target.value)}
          type={type === 'password' ? passwordHidden ? 'password' : 'text' : type}
          placeholder={placeholder}
          disabled={disabled}
          className={`input--input ${error ? 'input--error' : ''}`}
        />
      }


        <span className='input--label'>{label}</span>

        {
          type === 'password' ?
          passwordHidden ?
            <TbEyeOff onClick={disabled ? null : () => setPasswordHidden(false)} className='input--icon'/> :
            <TbEye onClick={disabled ? null : () => setPasswordHidden(true)} className='input--icon'/> :
          null
        }
        {
            error &&
            <div className='input_error--wrapper'>
                <TbExclamationCircle className='input_error--icon'/>
                <small className='input_error--label'>{error}</small>
            </div>
        }

    </label>
  )
}

export default Input
