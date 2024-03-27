import React, { useState } from 'react';
import { AnimatePresence, motion, LayoutGroup  } from 'framer-motion';
import { PiEyeFill, PiEyeSlashFill , PiWarningCircleBold } from 'react-icons/pi'
import { inOut, base, search, textError } from '../../../Constants/animations';
import './styles.scss';

function TextInput(props) {
    const {name, label, placeholder, type, error, value, setValue, disabled} = props;
    const [ passwordHidden, setPasswordHidden ] = useState(true);

    return (
    <LayoutGroup>
        <motion.label layout htmlFor={name} className="input--wrapper">
            { label && <motion.span className='tint sm'>{label}</motion.span> }
            {
                type === 'textarea' ?
                <motion.textarea
                    id={name}
                    name={name}
                    defaultValue={value}
                    onChange={setValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`input--text input--textarea ${error ? 'input--error' : ''}`}>
                </motion.textarea> :
                <motion.input
                    id={name}
                    name={name}
                    defaultValue={value}
                    onChange={setValue}
                    type={type === 'password' ? passwordHidden ? 'password' : 'text' : type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`input--text ${error ? 'input--error' : ''}`}
                />
            }


            {
                type === 'password' ?
                <AnimatePresence mode="wait">
                    {

                        passwordHidden ?
                            <motion.span
                                {...base} variants={search}
                                key={`password--${passwordHidden}`}
                                onClick={disabled ? null : () => setPasswordHidden(false)}
                            >
                                <PiEyeSlashFill className='input--icon'/>
                            </motion.span> :
                            <motion.span
                                {...base} variants={search}
                                key={`password--${passwordHidden}`}
                                onClick={disabled ? null : () => setPasswordHidden(true)}
                            >
                                <PiEyeFill className='input--icon'/>
                            </motion.span>
                    }
                </AnimatePresence>
                : null
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
