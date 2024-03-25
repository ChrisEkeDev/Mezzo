import React, { useState } from 'react';
import { AnimatePresence, motion, LayoutGroup  } from 'framer-motion';
import { PiEyeFill, PiEyeSlashFill , PiWarningCircleBold } from 'react-icons/pi'
import './styles.scss';
import { inOut, textError } from '../../../constants/animations';

function TextInput({name, label, placeholder, type, error, value, setValue, disabled}) {
    const [ passwordHidden, setPasswordHidden ] = useState(true);
    return (
    <LayoutGroup>
        <motion.label layout htmlFor={name} className="input--wrapper">
            { label && <motion.span className='sm'>{label}</motion.span> }
        {
            type === 'textarea' ?
            <motion.textarea
                id={name}
                name={name}
                defaultValue={value}
                onChange={(x) => setValue(x.target.value)}
                disabled={disabled}
                className={`input--textarea ${error ? 'input--error' : ''}`}>
            </motion.textarea> :
            <motion.input
                id={name}
                name={name}
                defaultValue={value}
                onChange={(x) => setValue(x.target.value)}
                type={type === 'password' ? passwordHidden ? 'password' : 'text' : type}
                placeholder={placeholder}
                disabled={disabled}
                className={`text_input ${error ? 'text_input--error' : ''}`}
            />
        }




            {
            type === 'password' ?
            passwordHidden ?
                <PiEyeSlashFill  onClick={disabled ? null : () => setPasswordHidden(false)} className='input--icon'/> :
                <PiEyeFill onClick={disabled ? null : () => setPasswordHidden(true)} className='input--icon'/> :
            null
            }
            <AnimatePresence>
            {
                error &&
                <motion.div {...inOut} variants={textError} layout className='input_error--wrapper'>
                    <PiWarningCircleBold className='input_error--icon'/>
                    <small className='input_error--label xs'>
                        <em>{error}</em>
                    </small>
                </motion.div>
            }
            </AnimatePresence>

        </motion.label>
    </LayoutGroup>
  )
}

export default TextInput
