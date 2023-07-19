import React, { useEffect, useState } from 'react'
import Input from '../input';
import Image from '../input/image';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoading } from '../../context/loading';
import { useAlerts } from '../../context/alerts';
import { thunkCreateArtist } from '../../store/artists';
import './newArtist.css';
import Button from '../button';

function NewArtist() {
    const [ name, setName ] = useState('');
    const [ bio, setBio ] = useState('');
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
    const createArtist = async (e) => {
        e.preventDefault();
        setLoading({message: 'Creating your artist...'});
        try {
            const artistData = {
                name,
                bio: bio ? bio : null,
                image: image ? image : null
            }
            const formData = new FormData()
            formData.append("name", artistData.name)
            formData.append("bio", artistData.bio)
            formData.append("image", artistData.image)
            const data = await dispatch(thunkCreateArtist(formData))
            const message = data.message;
            const newArtist = data.Artist;
            handleAlerts(message)
            navigate(`/dashboard/artists/${newArtist.id}`)
        } catch(error) {
            console.log(error)
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
        if (bio.trim().length > 500) {
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
            <h1 className='new_artist--title'>Create New Artist</h1>
            <form id="create-artist" encType='multipart/form-data' className='new_artist--form' onSubmit={createArtist}>
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
            <Image
                name='image'
                label='Artist Image'
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
