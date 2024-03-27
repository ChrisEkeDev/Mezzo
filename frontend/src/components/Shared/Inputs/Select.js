import React, { useState } from 'react';
import { AnimatePresence, motion, LayoutGroup  } from 'framer-motion';
import { inOut, search, textError } from '../../../Constants/animations';
import { PiWarningCircleBold } from 'react-icons/pi'
import './styles.scss';

function Select(props) {
    const { label, options, name, setValue, error } = props;
    const optionsKeys = Object.keys(options);

    return (
        <LayoutGroup>
            <motion.label layout htmlFor={name} className="input--wrapper">
                { label && <motion.span className='tint sm'>{label}</motion.span> }
                <motion.select
                    id={name}
                    name={name}
                    onChange={setValue}
                    defaultValue={options[0]}
                    className='input--text input--select'
                >
                    {optionsKeys.map((option, i) => (
                        <option key={option} value={options[option].value}>
                            {options[option].label}
                        </option>
                    ))}
                </motion.select>
            </motion.label>
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
        </LayoutGroup>
    )
}

export default Select
