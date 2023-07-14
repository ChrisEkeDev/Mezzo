import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetUserSongs } from '../../store/songs';
import LoadingData from '../loading/loadingData';
import './songs.css'
import SongItem from './songItem';

function MySongs() {
    const [ loading, setLoading ] = useState(true)
    const user = useSelector(state => state.session.user)
    const data = useSelector(state => state.songs.user)
    const songs = Object.values(data);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(thunkGetUserSongs())
        .then(() => setLoading(false))
    }, [dispatch])

    if (loading || !data) return <LoadingData></LoadingData>

    return (
        <div className="songs--wrapper">
                <header className='songs--header'>
                    <div></div>
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

export default MySongs
