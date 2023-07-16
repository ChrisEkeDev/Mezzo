import React, { useEffect, useState } from 'react';
import Input from '../input';
import { useHistory } from 'react-router-dom';
import { useLoading } from '../../context/loading';
import { useAlerts } from '../../context/alerts';
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
    const [ image, setImage ] = useState(undefined);
    const [ errors, setErrors ] = useState({})
    const { setLoading } = useLoading();
    const { handleAlerts } = useAlerts();
    const history = useHistory();
    const dispatch = useDispatch();

    const navigate = (route) => {
        history.push(route);
    }

    const handleImage = (x) => {
        setImage(x.target.files[0])
    }

    const updateArtist = async (e) => {
        e.preventDefault();
        setLoading({message: "Updating your artist..."});
        try {
            const artistData = {
                name: name === artist.name ? artist.name : name,
                bio: bio === artist.bio ? artist.bio : bio === "" ? null : bio,
                image: image === artist.image ? artist.image : image === "" ? null : image,
            }
            const formData = new FormData()
            formData.append("name", artistData.name)
            formData.append("bio", artistData.bio)
            formData.append("image", artistData.image)
            const data = await dispatch(thunkUpdateArtist(artist.id, formData))
            const message = data.message;
            const updatedArtist = data.Artist;
            handleAlerts(message);
            navigate(`/dashboard/artists/${updatedArtist.id}`)
        } catch(error) {
            let errors;
            if (errors.json()) errors = await error.json()
            else console.log(errors);
            if (errors.errors) setErrors(errors.errors)
            handleAlerts({message: 'There was an error while submitting your request.'})
        } finally {
            setLoading(undefined);
        }
    }

    useEffect(() => {
        const errors = {};
        if (name.trim().length < 1 || name.trim() > 30) {
          errors.name = 'Name must be between 1 and 30 characters';
        }
        if (bio && bio.trim().length > 500) {
          errors.bio = 'Artist Bio must be less than 500 characters';
        }
        const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png']
        if (image && !validFileTypes.find(type => type === image.type)) {
            errors.image = "Please select a valid file type (png, jpg)"
        }
        setErrors(errors)
    }, [name, bio, image])

    return (
        <div className='new_artist--wrapper'>
            <h1 className='new_artist--title'>Update Artist</h1>
            <form encType='multipart/form-data'  className='new_artist--form' onSubmit={updateArtist}>
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
            <input onChange={(x) => handleImage(x)} type='file' name='image' id='image' accept='image/*'/>
            <div className='new_artist--action'>
                <Button
                label='Update Artist'
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
