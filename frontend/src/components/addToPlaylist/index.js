import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkAddToPlaylist } from '../../store/playlists';
import Button from '../button';
import { TbPlaylistAdd } from 'react-icons/tb';

function AddToPlaylist({song, close}) {
    const playlistData = useSelector(state => state.playlists.all)
    const playlists = Object.values(playlistData);
    const dispatch = useDispatch();
    const [ selectedPlaylist, setSelectedPlaylist ] = useState(undefined);

    const handleSelectPlaylist = (playlist) => {
        setSelectedPlaylist(playlist)
    }

    const handleAddToPlaylist = () => {
        const id = {songId: song.id}
        dispatch(thunkAddToPlaylist(id, selectedPlaylist.id))
        .then(() => close())
    }

    return (
        <>
            <h2 className='confirm--title'>Select a Playlist</h2>
            <ul className='confirm--list'>
                {
                    playlists?.map(playlist => {
                        return (
                            <li key={playlist.id} className={`confirm--item ${selectedPlaylist?.id === playlist.id ? 'selected' : null}`} onClick={() => handleSelectPlaylist(playlist)}>{playlist.name}</li>
                        )
                    })
                }
            </ul>
            <div className='confirm--actions'>
                <span>{song.name} - {song.Artist.name}</span>
                <Button
                    label='Add to Playlist'
                    style='primary'
                    action={handleAddToPlaylist}
                    right={<TbPlaylistAdd/>}
                    disabled={!selectedPlaylist}
                />
            </div>
        </>
    )
}

export default AddToPlaylist
