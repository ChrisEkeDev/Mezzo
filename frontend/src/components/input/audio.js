import React from 'react'
import { useState } from 'react';
import './input.css';
import '../button/button.css';
import { TbExclamationCircle } from 'react-icons/tb';

function Audio({name, label, error, value, setValue}) {

    const handleSong = (e) => {
        setValue(e.target.files[0])
    };

    return (
        <label htmlFor={name}  className='input--wrapper'>
            <div className='button_input--wrapper'>
                <div className='button secondary'>Upload Song</div>
                { value ? <span className='value--populated'>{value.name}</span> : <span className='value--not_populated'>No file chosen</span>}
                <input id={name} className='media--input' type='file' accept='audio/*' onChange={(x) => handleSong(x)}/>
            </div>
            <span className='input--label'>{label}</span>
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

export default Audio
