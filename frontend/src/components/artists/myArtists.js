import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetUserArtists } from '../../store/artists';
import ArtistItem from './artistItem';
import LoadingData from '../loading/loadingData';
import './artists.css';

function Artists() {
    const [ loading, setLoading ] = useState(true)
    const artistsData = useSelector(state => state.artists.user)
    const artists = Object.values(artistsData)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetUserArtists())
        .then(() => setLoading(false))
    }, [dispatch])

    if (loading || !artistsData) return <LoadingData></LoadingData>

    return (
        <section className='artists--wrapper'>
            {
                artists.map(artist => (
                    <ArtistItem key={artist.id} artist={artist}/>
                ))
            }
        </section>
    )
}

export default Artists
