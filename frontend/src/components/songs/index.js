import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSongs } from '../../store/songs';
import LoadingData from '../loading/loadingData';
import './songs.css'
import SongItem from './songItem';

function Songs() {
    const [ loading, setLoading ] = useState(true)
    const user = useSelector(state => state.session.user);
    const playlists = useSelector(state => state.session.playlists)
    const data = useSelector(state => state.songs.all)
    const songs = Object.values(data);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllSongs())
        .then(() => setLoading(false))
    }, [dispatch])

    if (loading || !data) return <LoadingData></LoadingData>

    return (
        <div className="songs--wrapper">
                <header className='songs--header'>
                    <div className=''>
                    <div className='songs_header--wrapper song--grid'>
                            <span>Song</span>
                            <span className='songs_header--label'>
                                <span>Artist</span>
                            </span>
                            <span className='songs_header--label'>
                                <span>Genre</span>
                            </span>
                            <span className='songs_header--label'>
                                <span>Time</span>
                            </span>
                        </div>
                    </div>
                </header>
                <ul className='songs--list'>
                    {
                        songs.map(song => (
                            <SongItem key={song.id}  artist={song.Artist} isAuth={user.id === song.Artist.userId} song={song} />
                        ))
                    }
                </ul>
        </div>
    )
}

export default Songs
