import React, { useState, useEffect } from 'react'

function useArtistForm() {
    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
    })

    const [ errors, setErrors ] = useState({})

    const handleInput = (x) => {
        setFormData(prevState => ({...prevState, [x.target.name]: x.target.value}))
    }

    const onSignIn = (e) => {
        e.preventDefault();
        console.log(formData)
    }

    const onSignUp = (e) => {
        e.preventDefault();
        console.log(formData)
    }



    useEffect(() => {
        const errors = {}
        const { email, password } = formData;

        if (email && !email.includes('@') && !email.includes('.')) {
            errors.email = "Please enter a valid email address."
        }

        if (password && password.trim().length > 5) {
            errors.password = "The password must be at least 5 characters."
        }

        setErrors(errors)
    }, [formData])

    return { formData, handleInput, errors, onSignUp, onSignIn }
}

export default useArtistForm
