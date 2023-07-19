import React, { useState, useEffect } from 'react';
import placeholder from '../../assets/mezzo-placeholder.svg';
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
                artists.length > 0 ?
                artists.map(artist => (
                    <ArtistItem key={artist.id} artist={artist}/>
                )) :
                <div className='no_content--wrapper'>
                    <div className='no_content--contents'>
                        <img src={placeholder}/>
                        <p>You haven't created any artists.</p>
                    </div>
                </div>
            }
        </section>
    )
}

export default Artists
