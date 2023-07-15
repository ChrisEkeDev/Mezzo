import React from 'react';
import { useSelector } from 'react-redux';
import PlaylistItem from './playlistItem';
import './playlists.css';

function Playlists() {
    const playlistData = useSelector(state => state.playlists.all)
    const playlists = Object.values(playlistData)

    return (
        <section className='playlists--wrapper'>
            { playlists && playlists.map(playlist => (
                <PlaylistItem key={playlist.id} playlist={playlist}/>
            ))}
        </section>
    )
}

export default Playlists
