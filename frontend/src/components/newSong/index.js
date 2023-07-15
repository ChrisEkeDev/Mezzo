import React, { useEffect, useState } from 'react'
import Input from '../input';
import Select from '../input/select'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoading } from '../../context/loading';
import { useAlerts } from '../../context/alerts'
import { thunkCreateSong } from '../../store/songs';
import './newSong.css';
import Button from '../button';

function NewSong() {
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ file, setFile ] = useState('');
    const [ genre, setGenre] = useState(0)
    const [ errors, setErrors ] = useState({})
    const { setLoading } = useLoading();
    const { handleAlerts } = useAlerts();
    const history = useHistory();
    const dispatch = useDispatch();
    const artist = useSelector(state => state.artists.current);

    console.log(artist)

    const navigate = (route) => {
        history.push(route);
    }

    const createSong = async (e) => {
        e.preventDefault();
        setLoading({message: 'Creating your song...'});
        try {
            const songData = {
                name,
                description: description ? description : null,
                file,
                genreId: parseInt(genre),
                artistId: artist.id
            }
            const data = await dispatch(thunkCreateSong(songData))
            const message = data.message;
            const updatedArtist = data.Song.Artist;
            handleAlerts(message);
            navigate(`/dashboard/artists/${updatedArtist?.id}`)
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
        if (description.trim().length > 500) {
          errors.description = 'Song Description must be less than 500 characters';
        }
        if (file === '') {
            errors.file = 'Please add a file for the song';
        }
        if (!genre) {
            errors.genre = 'Please add a genre for the song';
        }
        setErrors(errors)
    }, [name, description, file, genre])


    return (
        <div className='new_artist--wrapper'>
            <h1 className='new_artist--title'>Create New Song</h1>
            <form className='new_artist--form' onSubmit={createSong}>
            <Input
                name='artist'
                label='Artist Name'
                value={`${artist.name}`}
                disabled={true}
            />
            <Input
                name='name'
                label='Song Name'
                value={name}
                setValue={setName}
                error={errors.name}
            />
            <Input
                name='description'
                label='Song Description'
                type='textarea'
                value={description}
                setValue={setDescription}
                error={errors.description}
            />
            <Select
                name='genre'
                label="Song Genre"
                value={genre}
                setValue={setGenre}
                error={errors.genre}
            />
            <Input
                name='file'
                label='Song File'
                value={file}
                setValue={setFile}
                error={errors.file}
            />
            <div className='new_artist--action'>
                <Button
                label='Create Song'
                style='primary'
                action={createSong}
                disabled={Object.keys(errors).length}
                />
            </div>
            </form>
        </div>
    )
}

export default NewSong
