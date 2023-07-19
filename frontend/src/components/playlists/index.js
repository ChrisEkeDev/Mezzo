import React from 'react';
import placeholder from '../../assets/mezzo-placeholder.svg';
import { useSelector } from 'react-redux';
import PlaylistItem from './playlistItem';
import './playlists.css';

function Playlists() {
    const playlistData = useSelector(state => state.playlists.all)
    const playlists = Object.values(playlistData)

    return (
        <section className='playlists--wrapper'>
            { playlists.length > 0 ?
                playlists.map(playlist => (
                    <PlaylistItem key={playlist.id} playlist={playlist}/>
                )) :
                <div className='no_content--wrapper'>
                    <div className='no_content--contents'>
                        <img src={placeholder}/>
                        <p>You haven't created any playlists.</p>
                    </div>
                </div>
            }
        </section>
    )
}

export default Playlists
