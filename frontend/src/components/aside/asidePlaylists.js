import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AsideGroupItem from './asideGroupItem';
import { useNowPlaying } from '../../context/nowPlaying';
import Modal from '../modal';
import { thunkGetPlaylists } from '../../store/playlists';
import NewPlaylist from '../newPlaylist';
import { TbPlus, TbPlaylist, TbGridDots  } from 'react-icons/tb';

function AsidePlaylists() {
    const playlistData = useSelector(state => state.playlists.all)
    const playlists = Object.values(playlistData);
    const [ loading, setLoading ] = useState(true)
    const [ newPlaylist, setNewPlaylist ] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch();
    const { aside, setAside } = useNowPlaying();

    const navigate = (route) => {
        history.push(route);
    }

    const handleAsideNavigation = (route) => {
        navigate(route)
        setAside(false)
    }

    const handleNewPlaylist = () => {
        setNewPlaylist(true)
        setAside(false)
    }

    useEffect(() => {
        dispatch(thunkGetPlaylists())
        .then(() => setLoading(false))
    }, [dispatch])

    if (loading || !playlists) return <div className='aside_group--wrapper'></div>

    return (
        <div className='aside_group--wrapper'>
            {
                newPlaylist ?
                <Modal>
                    <NewPlaylist close={() => setNewPlaylist(false)}/>
                </Modal> :
                null
            }
            <h2 className='aside_group--label'>Playlists</h2>
            <AsideGroupItem
                label='New Playlist'
                icon={<TbPlus className='playlist'/>}
                action={() => handleNewPlaylist(true)}
            />
            <AsideGroupItem
                label='All Playlists'
                icon={<TbPlaylist className='playlist'/>}
                action={() => handleAsideNavigation('/dashboard/playlists')}
                path='playlists'
            />
            {/* {
                playlists && playlists.map(playlist => {
                    return (
                        <AsideGroupItem
                        label={playlist.name}
                        icon={<TbPlaylist className='playlist_item'/>}
                        action={() => navigate(`/dashboard/playlist/${playlist.id}`)}
                    />
                    )

                })
            } */}
        </div>
    )
}

export default AsidePlaylists
