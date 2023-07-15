import React, { useState, useEffect } from 'react';
import { TbX } from 'react-icons/tb';
import { useLoading } from '../../context/loading';
import IconButton from '../button/iconButton';
import { useDispatch } from 'react-redux';
import Input from '../input';
import Button from '../button';
import { thunkUpdatePlaylist } from '../../store/playlists';

function UpdatePlaylist({playlist, close}) {
    const [ name, setName ] = useState(playlist.name);
    const [ errors, setErrors] = useState({})
    const { setLoading } = useLoading();
    const dispatch = useDispatch();

    const handleUpdatePlaylist = () => {
        setLoading(true)
        const data = { id: playlist.id, name: name === playlist.name ? playlist.name : name }
        return (
            dispatch(thunkUpdatePlaylist(data))
            .then(() => close())
            .then(() => setLoading(false))
        )

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
