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

    const onAddSongToPlaylist = (song) => {
        const { playlist } = formData;
        console.log(song)
        if (playlist.find(foundSong => foundSong.id === song.id)) return
        setFormData(prevState => ({ ...prevState, playlist:[...playlist, song] }));
    }

    useEffect(() => {
        const errors = {}
        const { name } = formData;

        if (name.trim().length === 0) {
            errors.name = "The name can't be empty."
        }

        setErrors(errors)
    }, [formData])


    return { formData, handleInput, errors, onAddSongToPlaylist, onCreatePlaylist }
}

export default usePlaylistForm
