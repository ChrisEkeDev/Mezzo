import React, { useState, useEffect } from 'react';
import { TbX } from 'react-icons/tb';
import { useLoading } from '../../context/loading';
import IconButton from '../button/iconButton';
import { useDispatch } from 'react-redux';
import Input from '../input';
import Button from '../button';
import { thunkCreatePlaylist } from '../../store/playlists';

function NewPlaylist({close}) {
    const [ name, setName ] = useState('');
    const [ errors, setErrors] = useState({})
    const { setLoading } = useLoading();
    const dispatch = useDispatch();

    const handleCreatePlaylist = () => {
        setLoading(true)
        const data = { name }
        return (
            dispatch(thunkCreatePlaylist(data))
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
                label='New Playlist Name'
                value={name}
                setValue={setName}
                error={errors.name}
            />
            <div className='confirm--actions'>
                <Button
                    label="Create Playlist"
                    style="primary"
                    action={handleCreatePlaylist}
                    disabled={Object.keys(errors).length}
                />
            </div>
        </div>
    )
}

export default NewPlaylist
