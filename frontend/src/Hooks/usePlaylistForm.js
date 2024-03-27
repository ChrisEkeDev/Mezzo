import React, { useState, useEffect } from 'react'

function usePlaylistForm() {
    const [ formData, setFormData ] = useState({
        name: '',
        playlist: []
    })

    const [ errors, setErrors ] = useState({})

    const handleInput = (x) => {
        setFormData(prevState => ({...prevState, [x.target.name]: x.target.value}))
    }

    const onCreatePlaylist = (e) => {
        e.preventDefault();
        console.log(formData)
    }

    const onAddToPlaylist = (data) => {

    }

    useEffect(() => {
        const errors = {}
        const { name } = formData;

        if (name.trim().length === 0) {
            errors.name = "The name can't be empty."
        }

        setErrors(errors)
    }, [formData])


    return { name, playlist, errors, onAddToPlaylist, onCreatePlaylist }
}

export default usePlaylistForm
