import React, { useEffect, useState } from 'react';
import Input from '../input';
import Audio from '../input/audio';
import { useHistory } from 'react-router-dom';
import { useLoading } from '../../context/loading';
import { useAlerts } from '../../context/alerts';
import { thunkUpdateSong } from '../../store/songs';
import { useNowPlaying } from '../../context/nowPlaying';
import { useParams } from 'react-router-dom';
import Button from '../button';
import Select from '../input/select'
import { useDispatch, useSelector } from 'react-redux';
import LoadingData from '../loading/loadingData';
import { thunkGetSong } from '../../store/songs';
import { thunkGetArtist } from '../../store/artists'
import '../newSong/newSong.css';

function UpdateSong({song}) {
    const [ name, setName ] = useState(song.name);
    const [ description, setDescription ] = useState(song.description);
    const [ songUrl, setSongUrl ] = useState(undefined);
    const [ genre, setGenre] = useState(song.genreId)
    const [ errors, setErrors ] = useState({})
    const { setLoading } = useLoading();
    const { handleAlerts } = useAlerts();
    const { currentTrack, handleClear } = useNowPlaying();
    const history = useHistory();
    const dispatch = useDispatch();
    const artist = useSelector(state => state.artists.current);

    const navigate = (route) => {
        history.push(route);
    }

    const updateSong = async (e) => {
        e.preventDefault();
        setLoading({message: 'Updating your song...'});
        try {
            if (song.id === currentTrack.id) {
                handleClear();
            }
            const formData = new FormData()
            formData.append("name", name)
            if (description) formData.append("description", description)
            formData.append("genreId", parseInt(genre))
            if (songUrl) {
                formData.append("song", songUrl)
            }
            const data = await dispatch(thunkUpdateSong(song.id, formData))
            const message = {message: "Song updated successfully."};
            handleAlerts(message);
            navigate(`/dashboard/artists/${artist?.id}`)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(undefined);
        }
    }

    useEffect(() => {
        const errors = {};
        if (name.trim().length < 1 || name.trim() > 30) {
          errors.name = 'Name must be between 1 and 30 characters';
        }
        if (description && description.trim().length > 500) {
          errors.description = 'Song Description must be less than 500 characters';
        }
        if (!genre) {
            errors.genre = 'Please add a genre for the song';
        }
        const validFileTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg']
        if (songUrl && !validFileTypes.find(type => type === songUrl.type)) {
            errors.songUrl = "Please select a valid file type (mp3, wav, ogg)"
        }
        setErrors(errors)
    }, [name, description, songUrl, genre])


    return (
        <div className='new_artist--wrapper'>
            <h1 className='new_artist--title'>Update Song</h1>
            <form encType='multipart/form-data' className='new_artist--form' onSubmit={updateSong}>
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
            <Audio
                name={song}
                label="Song File"
                value={songUrl}
                setValue={setSongUrl}
                error={errors.song}
            />
            <div className='new_artist--action'>
                <Button
                label='Update Song'
                style='primary'
                action={updateSong}
                disabled={Object.keys(errors).length}
                />
            </div>
            </form>
        </div>
    )
}


function UpdateWrapper() {
    const { artistId, songId } = useParams();
    const [ isLoading, setIsLoading ] = useState(true);
    const dispatch = useDispatch();
    const song = useSelector(state =>  state.songs.current);

    useEffect(() => {
        dispatch(thunkGetSong(songId))
        .then(() => dispatch(thunkGetArtist(artistId)))
        .then(() => setIsLoading(false))
    }, [dispatch])

    if (isLoading || !song) return <LoadingData></LoadingData>

    return <UpdateSong song={song}/>
  }

export default UpdateWrapper
