import React, { useEffect, useState } from 'react';
import Input from '../input';
import { useHistory } from 'react-router-dom';
import { useLoading } from '../../context/loading';
import { thunkUpdateArtist } from '../../store/artists';
import { useParams } from 'react-router-dom';
import Button from '../button';
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from '../loading/loadingData';
import { thunkGetArtist } from '../../store/artists';
import '../newArtist/newArtist.css';

function UpdateArtist({artist}) {
    const [ name, setName ] = useState(artist.name);
    const [ bio, setBio ] = useState(artist.bio);
    const [ image, setImage ] = useState(artist.image);
    const [ errors, setErrors ] = useState({})
    const { setLoading } = useLoading();
    const history = useHistory();
    const dispatch = useDispatch();

    const navigate = (route) => {
        history.push(route);
    }

    const updateArtist = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: name === artist.name ? artist.name : name,
            bio: bio === artist.bio ? artist.bio : bio,
            image: image === artist.image ? artist.image : image,
        }
        return (
            dispatch(thunkUpdateArtist(artist.id, data))
            .then((res) => {
                const artist = res.Artist;
                navigate(`/dashboard/artist/${artist.id}`)
                setLoading(false);
            })
            .catch(async(errors) => {
                const data = await errors.json();
                if (data && data.errors) setErrors(data)
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
            <h1 className='new_artist--title'>Update Artist</h1>
            <form className='new_artist--form' onSubmit={updateArtist}>
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
                action={updateArtist}
                disabled={Object.keys(errors).length}
                />
            </div>
            </form>
        </div>
    )
}

function UpdateWrapper() {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const dispatch = useDispatch();
    const artist = useSelector(state =>  state.artists.current);

    useEffect(() => {
        dispatch(thunkGetArtist(id))
        .then(() => setLoading(false))
    }, [dispatch])

    if (loading || !artist) return <LoadingData></LoadingData>

    return <UpdateArtist artist={artist}/>
  }

export default UpdateWrapper
