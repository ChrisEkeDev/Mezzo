import React from 'react';
import { useSelector } from 'react-redux';
import { TbExclamationCircle } from 'react-icons/tb';
import './input.css';

function Select({name, label, value, setValue, error, disabled}) {
    const genreData = useSelector(state => state.songs.genres)
    const genres = Object.values(genreData)

    return (
        <label className="select--select" htmlFor={name}>
            <div className={`select--wrapper ${error ? 'input--error' : ''}`}>
                <select
                    id={name}
                    name={name}
                    defaultValue={value}
                    onChange={(x) => setValue(x.target.value)}
                    disabled={disabled}
                    className="input--select"
                >
                    <option value={0} disabled>Select genre</option>
                    {genres.length && genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}

                </select>
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

export default Select
