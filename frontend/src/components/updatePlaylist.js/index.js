import React, { useState, useEffect } from 'react';
import { TbX } from 'react-icons/tb';
import { useLoading } from '../../context/loading';
import { useAlerts } from '../../context/alerts';
import IconButton from '../button/iconButton';
import { useDispatch } from 'react-redux';
import Input from '../input';
import Button from '../button';
import { thunkUpdatePlaylist } from '../../store/playlists';

function UpdatePlaylist({playlist, close}) {
    const [ name, setName ] = useState(playlist.name);
    const [ errors, setErrors] = useState({})
    const { setLoading } = useLoading();
    const { handleAlerts } = useAlerts();
    const dispatch = useDispatch();

    const handleUpdatePlaylist = async () => {
        setLoading({message: 'Updating your playlist...'})
        try {
            const playlistData = { id: playlist.id, name: name === playlist.name ? playlist.name : name }
            const data = await dispatch(thunkUpdatePlaylist(playlistData));
            const message = data.message;
            handleAlerts(message)
            close()
        } catch(error) {
            let errors;
            if (errors.json()) errors = await error.json()
            else console.log(errors);
            if (errors.errors) setErrors(errors.errors)
            handleAlerts({message: 'There was an error while submitting your request.'})
        } finally {
            setLoading(undefined)
        }
    }

    useEffect(() => {
        const errors = {}
        if (name.trim().length === 0) {
            errors.name = "Please enter a name for your playlist"
        }
        if (name.trim().length > 30) {
            errors.name = "Playlist name must be less than 30 characters"
        }
        setErrors(errors)
    }, [name])

    return (
        <div className='confirm--wrapper'>
            <div className='confirm--close'>
                <IconButton
                    style='close'
                    icon={<TbX/>}
                    action={close}
                />
            </div>
            <Input
                name="name"
                label='Update Playlist Name'
                value={name}
                setValue={setName}
                error={errors.name}
            />
            <div className='confirm--actions'>
                <Button
                    label="Update Playlist"
                    style="primary"
                    action={handleUpdatePlaylist}
                    disabled={Object.keys(errors).length}
                />
            </div>
        </div>
    )
}

export default UpdatePlaylist
