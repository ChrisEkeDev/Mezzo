import React, { useState, useEffect } from 'react';
import { csrfFetch } from "../../store/csrf";
import { TbExclamationCircle } from 'react-icons/tb';
import './input.css';

function Select({name, label, value, setValue, error, disabled}) {
    const [ genres, setGenres ] = useState([])

    const getGenres = async () => {
        const res = await csrfFetch(`/api/genres`)
        if (res.ok) {
            const data = await res.json();
            setGenres(data)
        }
    }

    useEffect(() => {
        getGenres();
    }, [])

    if (!genres.length) return <></>

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
