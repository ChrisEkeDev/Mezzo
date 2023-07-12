import React, { useEffect, useState } from 'react'
import Input from '../input';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoading } from '../../context/loading';
import { thunkCreateArtist } from '../../store/artists';
import './newArtist.css';
import Button from '../button';

function NewArtist() {
    const [ name, setName ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ image, setImage ] = useState('');
    const [ errors, setErrors ] = useState({})
    const { setLoading } = useLoading();
    const history = useHistory();
    const dispatch = useDispatch();

    const navigate = (route) => {
        history.push(route);
    }

    const createArtist = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name,
            bio: bio ? bio : null,
            image: image ? image : null
        }
        return (
            dispatch(thunkCreateArtist(data))
            .then((res) => {
                const artist = res.Artist;
                navigate(`/dashboard/artist/${artist?.id}`)
                setLoading(false);
            })
            .catch(async(errors) => {
                const data = await errors.json();
                if (data && data.errors) setErrors(data.errors)
                setLoading(false);
            })
        )
    }

    useEffect(() => {
        const errors = {};
        if (name.trim().length < 1 || name.trim() > 30) {
          errors.name = 'Name must be between 1 and 30 characters';
        }
        if (bio.trim().length > 500) {
          errors.bio = 'Artist Bio must be less than 500 characters';
        }
        setErrors(errors)
    }, [name, bio, image])


    return (
        <div className='new_artist--wrapper'>
            <h1 className='new_artist--title'>Create New Artist</h1>
            <form className='new_artist--form' onSubmit={createArtist}>
            <Input
                name='name'
                label='Artist Name'
                value={name}
                setValue={setName}
                error={errors.name}
            />
            <Input
                name='bio'
                label='Artist Bio'
                type='textarea'
                value={bio}
                setValue={setBio}
                error={errors.bio}
            />
            <Input
                name='image'
                label='Artist Image URL'
                value={image}
                setValue={setImage}
                error={errors.image}
            />
            <div className='new_artist--action'>
                <Button
                label='Create Artist'
                style='primary'
                action={createArtist}
                disabled={Object.keys(errors).length}
                />
            </div>
            </form>
        </div>
    )
}

export default NewArtist
