import React, { useState, useEffect } from 'react'

function useSongForm() {
    const [ formData, setFormData ] = useState({
        name: '',
        details: '',
        genre: '',
        file: null
    })

    const [ errors, setErrors ] = useState({})

    const handleInput = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'file' && file && file.type === "audio/mpeg") {
            setFormData(prevState => ({...prevState, [name]: file}))
        } else {
            setFormData(prevState => ({...prevState, [name]: value}))
        }

    }

    const onCreateSong = (e) => {
        e.preventDefault();
        console.log(formData)
    }

    useEffect(() => {
        const errors = {}
        const { name, details, file } = formData;

        if (name.trim().length < 5) {
            errors.name = "The name must be at least 5 characters."
        }

        if (details.trim() > 250) {
            errors.details = "The details must be less than 250 characters."
        }

        if (!file) {
            errors.file = "Please add a file for your song."
        }

        setErrors(errors)
    }, [formData])

    return { formData, handleInput, errors, onCreateSong }
}

export default useSongForm
