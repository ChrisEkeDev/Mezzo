import React, { useState, useEffect } from 'react'

function useArtistForm() {
    const [ formData, setFormData ] = useState({
        name: '',
        bio: '',
    })

    const [ errors, setErrors ] = useState({})

    const handleInput = (x) => {
        setFormData(prevState => ({...prevState, [x.target.name]: x.target.value}))
    }

    const onCreateArtist = (e) => {
        e.preventDefault();
        console.log(formData)
    }



    useEffect(() => {
        const errors = {}
        const { name, bio } = formData;

        if (name.trim().length < 5) {
            errors.name = "The name must be at least 5 characters."
        }

        if (bio.trim().length > 250) {
            errors.bio = "The bio must be less than 250 characters."
        }

        setErrors(errors)
    }, [formData])

    return { formData, handleInput, errors, onCreateArtist }
}

export default useArtistForm
