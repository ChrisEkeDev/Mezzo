import React, { useEffect, useState } from 'react';
import Input from '../input';
import { useHistory } from 'react-router-dom';
import { useLoading } from '../../context/loading';
import { thunkUpdateSong } from '../../store/songs';
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
    const [ file, setFile ] = useState(song.file);
    const [ genre, setGenre] = useState(song.genreId)
    const [ errors, setErrors ] = useState({})
    const { setLoading } = useLoading();
    const history = useHistory();
    const dispatch = useDispatch();
    const artist = useSelector(state => state.artists.current);

    const navigate = (route) => {
        history.push(route);
    }

    const updateSong = (e) => {
        e.preventDefault();
        setLoading({message: 'Updating your song...'});
        const data = {
            name: name === song.name ? song.name : name,
            description: description === song.description ? song.description : description === "" ? null : description,
            file: file === song.file ? song.file : file,
            genreId: parseInt(genre),
            artistId: artist.id
        }
        return (
            dispatch(thunkUpdateSong(song.id, data))
            .then((res) => {
                const artist = res.Song.Artist;
                navigate(`/dashboard/artist/${artist?.id}`)
                setLoading(undefined);
            })
            .catch(async(errors) => {
                const data = await errors.json();
                if (data && data.errors) setErrors(data.errors)
                setLoading(undefined);
            })
        )
    }

    useEffect(() => {
        const errors = {};
        if (name.trim().length < 1 || name.trim() > 30) {
          errors.name = 'Name must be between 1 and 30 characters';
        }
        if (description && description.trim().length > 500) {
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
            <h1 className='new_artist--title'>Update Song</h1>
            <form className='new_artist--form' onSubmit={updateSong}>
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
    const [ loading, setLoading ] = useState(true);
    const dispatch = useDispatch();
    const song = useSelector(state =>  state.songs.current);

    useEffect(() => {
        dispatch(thunkGetSong(songId))
        .then(() => dispatch(thunkGetArtist(artistId)))
        .then(() => setLoading(false))
    }, [dispatch])

    if (loading || !song) return <LoadingData></LoadingData>

    return <UpdateSong song={song}/>
  }

export default UpdateWrapper
