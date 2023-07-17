import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LoadingData from '../loading/loadingData';
import { useLoading } from '../../context/loading';
import { useAlerts } from '../../context/alerts';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetPlaylist, thunkDeletePlaylist } from '../../store/playlists';
import Modal from '../modal';
import placeholder from '../../assets/mezzo-placeholder.svg'
import useOutsideClick from '../../hooks/useOutsideClick';
import { thunkSetNowPlaying } from '../../store/songs';
import './playlists.css';
import IconButton from '../button/iconButton';
import SongItem from '../songs/songItem';
import Button from '../button';
import { TbPlayerPlayFilled, TbDots, TbEdit, TbTrash, TbX, TbHeartPlus, TbPlus, TbArrowsShuffle } from 'react-icons/tb';
import UpdatePlaylist from '../updatePlaylist.js';
import '../songs/songs.css';

function Playlist() {
    const user = useSelector(state => state.session.user);
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ deletingPlaylist, setDeletingPlaylist ] = useState(false);
    const [ updatingPlaylist, setUpdatingPlaylist ] = useState(false);
    const { id } = useParams();
    const { setLoading } = useLoading();
    const { handleAlerts } = useAlerts();
    const playlist = useSelector(state => state.playlists.current)
    const history = useHistory();
    const dispatch = useDispatch();

    const navigate = (route) => {
        history.push(route);
    }

    const deletePlaylist = async () => {
        setLoading({message: 'Deleting your playlist...'})
        try {
            const message = await dispatch(thunkDeletePlaylist(playlist))
            handleAlerts(message);
            navigate('/dashboard/playlists')
        } catch(error) {
            let message;
            if (error.json()) message = await error.json()
            handleAlerts(message);
        } finally {
            setLoading(undefined)
        }
    }

    const handlePlay = () => {
        dispatch(thunkSetNowPlaying(playlist.Songs))
    }

    useEffect(() => {
        dispatch(thunkGetPlaylist(id))
        .then(() => setIsLoading(false))
    }, [dispatch, id])

    if (isLoading || !playlist) return <LoadingData></LoadingData>

    return (
        <div className='playlist--wrapper'>
            <header>
                <div className='playlist_header--wrapper'>
                <div className='playlist_header--contents'>
                <div className='playlist--image'>
                    <img src={placeholder}/>
                </div>
                <div className='playlist--data'>
                    <div className='playlist--text'>
                        <h1>{playlist?.name}</h1>
                    </div>
                    <div className='playlist--actions'>
                        <Button
                            label='Play'
                            style='primary'
                            left={<TbPlayerPlayFilled/>}
                            action={handlePlay}
                        />
                        <Button
                            label='Shuffle'
                            style='primary'
                            left={<TbArrowsShuffle/>}
                        />
                    </div>
                </div>
                </div>
                <div onClick={() => setIsVisible(true)} className='playlist_manage--wrapper'>
                    <span className='playlist_manage--title'>Manage Playlist</span>
                    <IconButton
                        style='secondary'
                        icon={<TbDots/>}
                    />
                    {   isVisible ?
                        <div ref={ref} className='hover_menu--wrapper'>
                                <span onClick={() => setUpdatingPlaylist(true)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Update Playlist</span>
                                    <span className='hover_menu--icon'><TbEdit/></span>
                                </span>
                                <span onClick={() => setDeletingPlaylist(true)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Delete Playlist</span>
                                    <span className='hover_menu--icon'><TbTrash/></span>
                                </span>
                                <span onClick={() => setIsVisible(false)} className='hover_menu--option'>
                                    <span className='hover_menu--label'>Close</span>
                                    <span className='hover_menu--icon'><TbX/></span>
                                </span>
                        </div> :
                        null
                    }
                </div>
                {
                    updatingPlaylist ?
                    <Modal>
                        <UpdatePlaylist playlist={playlist} close={() => setUpdatingPlaylist(false)}/>
                    </Modal> :
                    null
                }
                {
                    deletingPlaylist ?
                    <Modal>
                        <div className='confirm--wrapper'>
                            <div className='confirm--close'>
                                <IconButton
                                    style='close'
                                    icon={<TbX/>}
                                    action={() => setDeletingPlaylist(false)}
                                />
                            </div>
                            <div className='confirm--content'>
                                <h2>Are you sure you want to delete this playlist?</h2>
                                <p>This can't be undone.</p>
                            </div>
                            <div className='confirm--actions'>
                                <Button
                                    label="Cancel"
                                    style="cancel"
                                    action={() => setDeletingPlaylist(false)}
                                />
                                <Button
                                    label="Delete"
                                    style="delete"
                                    action={deletePlaylist}
                                    right={<TbTrash/>}
                                />
                            </div>
                        </div>
                    </Modal> :
                    null
                }
                </div>
                <div className='playlist_songs--header'>
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
                </div>
                </header>
                <ul className='songs--list'>
                    {   playlist.Songs?.length ?
                        playlist.Songs?.map(song => (
                            <SongItem onPlaylistPage={playlist.id} key={song.id}  artist={song.Artist} isAuth={user.id === song.Artist.userId} song={song} />
                        )) :
                        null
                    }
                </ul>
        </div>
    )
}

export default Playlist
