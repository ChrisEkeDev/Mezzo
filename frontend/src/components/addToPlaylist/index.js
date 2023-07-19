import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLoading } from '../../context/loading';
import { useAlerts } from '../../context/alerts';
import { thunkAddToPlaylist } from '../../store/playlists';
import Button from '../button';
import { TbCircleCheckFilled, TbPlaylistAdd } from 'react-icons/tb';

function AddToPlaylist({song, close}) {
    const playlistData = useSelector(state => state.playlists.all)
    const playlists = Object.values(playlistData);
    const { setLoading } = useLoading();
    const { handleAlerts } = useAlerts();
    const dispatch = useDispatch();
    const [ selectedPlaylist, setSelectedPlaylist ] = useState(undefined);

    const handleSelectPlaylist = (playlist) => {
        setSelectedPlaylist(playlist)
    }

    const handleAddToPlaylist = async () => {
        setLoading({message: 'Adding song to playlist...'})
        const id = {songId: song.id}
        try {
            const data = await dispatch(thunkAddToPlaylist(id, selectedPlaylist.id))
            const message = data.message;
            handleAlerts(message)
        } catch(error) {
            const message = await error.json()
            handleAlerts(message)
        } finally {
            setLoading(undefined)
            close();
        }
    }


    return (
        <>
            <h2 className='confirm--title'>Select a Playlist</h2>
            <ul className='confirm--list'>
                {
                    playlists?.map(playlist => {
                        return (
                            <li
                                key={playlist.id}
                                className={`confirm--item ${selectedPlaylist?.id === playlist.id ? 'selected' : null}`}
                                onClick={() => handleSelectPlaylist(playlist)}>
                                    <span>{playlist.name}</span>
                                    {
                                        playlist?.PlaylistSongs?.filter(pls => pls.songId === song.id).length ?
                                        <span className='confirm--icon'><TbCircleCheckFilled/></span> :
                                        null
                                    }
                            </li>
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
