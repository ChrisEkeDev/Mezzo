import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../modal';
import IconButton from '../button/iconButton';
import { useLoading } from '../../context/loading';
import { useAlerts } from '../../context/alerts';
import { useSelector, useDispatch } from 'react-redux';
import { thunkDeleteSong } from '../../store/songs';
import { thunkGetArtist } from '../../store/artists';
import { thunkAddSongToFavorites, thunkRemoveSongFromFavorites } from '../../store/favorites';
import AddToPlaylist from '../addToPlaylist';
import { thunkRemoveFromPlaylist } from '../../store/playlists';
import Button from '../button';
import { TbPlayerPlayFilled, TbDots, TbEdit, TbTrash, TbX, TbHeartPlus,TbHeartMinus, TbPlaylistX,  TbPlaylistAdd, TbHeartFilled } from 'react-icons/tb';
import useOutsideClick from '../../hooks/useOutsideClick';

function SongItem({song, isAuth, artist, playlist}) {
    const [ deletingSong, setDeletingSong ] = useState(false);
    const [ addingToPlaylist, setAddingToPlaylist ] = useState(false);
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const favoritesData = useSelector(state => state.favorites.songs);
    const { setLoading } = useLoading();
    const { handleAlerts } = useAlerts();
    const favorites = Object.values(favoritesData)
    const history = useHistory();
    const dispatch = useDispatch();

    const isFavorited = favorites.some(favorite => favorite.songId === song.id);

    const navigate = (route) => {
        history.push(route);
    }

    const deleteSong = async () => {
        setLoading({message: 'Deleting song...'})
        try {
            const message = await dispatch(thunkDeleteSong(song));
            handleAlerts(message);
            dispatch(thunkGetArtist(artist.id))
        } catch (error) {
            const message = await error.json();
            handleAlerts(message)
        } finally {
            setLoading(undefined)
        }
    }

    const handleRemoveFromPlaylist = async () => {
        setLoading({message: 'Removing song from playlist...'})
        const id = {songId: song.id}
        try {
            const data = await dispatch(thunkRemoveFromPlaylist(id, playlist))
            const message = data.message;
            handleAlerts(message);
        } catch(error) {
            const message = error.json()
            handleAlerts(message);
        } finally {
            setLoading(undefined)
        }
    }

    const handleAddFavorite = async (id) => {
        setLoading({message: 'Adding song to favorites...'})
        try {
            const data = await dispatch(thunkAddSongToFavorites({songId: id}))
            const message = data.message;
            handleAlerts(message);
            setIsVisible(false)
        } catch(error) {
            handleAlerts(error);
        } finally {
            setLoading(undefined)
        }
    }

    const handleRemoveFavorite = async (id) => {
        setLoading({message: 'Removing song from favorites...'})
        try {
            const data = await dispatch(thunkRemoveSongFromFavorites({songId: id}))
            const message = data.message;
            handleAlerts(message);
            setIsVisible(false)
        } catch(error) {
            handleAlerts(error);
        } finally {
            setLoading(undefined)
        }

    }

    return (
        <li className='song_item--wrapper song--grid'>
            <div className='song_item--name'>
                <div className='song_item--image' style={{backgroundImage: `url(${artist.image})`}}>

                </div>
                <span>{song.name}</span>
                { isFavorited ? <span className='song_item--favorite'><TbHeartFilled/></span> : null }
                <span onClick={() => setIsVisible(true)} className='song_item--icon'><TbDots/></span>
                {   isVisible ?
                        <div ref={ref} className='hover_menu--wrapper'>
                            {
                                playlist ?
                                <span onClick={handleRemoveFromPlaylist} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Remove from Playlist</span>
                                    <span className='hover_menu--icon'><TbPlaylistX/></span>
                                </span> :
                                <span onClick={() => setAddingToPlaylist(true)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Add to Playlist</span>
                                    <span className='hover_menu--icon'><TbPlaylistAdd/></span>
                                </span>
                            }
                            {
                                isAuth ?
                                <>
                                <span onClick={() => navigate(`/dashboard/artists/${artist.id}/songs/${song?.id}/update`)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Update Song</span>
                                    <span className='hover_menu--icon'><TbEdit/></span>
                                </span>
                                <span onClick={() => setDeletingSong(true)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Delete Song</span>
                                    <span className='hover_menu--icon'><TbTrash/></span>
                                </span>
                                </> :
                                null
                            }
                            {
                                isFavorited ?
                                <span onClick={() => handleRemoveFavorite(song.id)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Remove from favorites</span>
                                    <span className='hover_menu--icon'><TbHeartMinus/></span>
                                </span> :
                                <span onClick={() => handleAddFavorite(song.id)} className='hover_menu--option'>
                                <span className='hover_menu--label'>Add to favorites</span>
                                <span className='hover_menu--icon'><TbHeartPlus/></span>
                                </span>
                            }

                                <span onClick={() => setIsVisible(false)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Close</span>
                                    <span className='hover_menu--icon'><TbX/></span>
                                </span>

                        </div> :
                        null
                    }
            </div>
                {
                    deletingSong ?
                    <Modal>
                        <div className='confirm--wrapper'>
                            <div className='confirm--close'>
                                <IconButton
                                    style='close'
                                    icon={<TbX/>}
                                    action={() => setDeletingSong(false)}
                                />
                            </div>
                            <div className='confirm--content'>
                                <h2>Are you sure you want to delete this song?</h2>
                                <p>This can't be undone.</p>
                            </div>
                            <div className='confirm--actions'>
                                <Button
                                    label="Cancel"
                                    style="cancel"
                                    action={() => setDeletingSong(false)}
                                />
                                <Button
                                    label="Delete"
                                    style="delete"
                                    action={deleteSong}
                                    right={<TbTrash/>}
                                />
                            </div>
                        </div>
                    </Modal> :
                    null
                }
                {
                    addingToPlaylist ?
                    <Modal>
                        <div className='confirm--wrapper'>
                            <div className='confirm--close'>
                                <IconButton
                                    style='close'
                                    icon={<TbX/>}
                                    action={() => setAddingToPlaylist(false)}
                                />
                            </div>
                            <AddToPlaylist song={song} close={() => setAddingToPlaylist(false)}/>
                        </div>
                    </Modal> :
                    null
                }
            <div className='song_item--artist' onClick={() => navigate(`/dashboard/artists/${artist.id}`)}>{artist.name}</div>
            <div className='song_item--genre'>{song.Genre.name}</div>
            <div className='song_item--time'>0:00</div>
        </li>
    )
}

export default SongItem
